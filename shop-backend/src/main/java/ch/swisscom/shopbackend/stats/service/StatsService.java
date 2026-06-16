package ch.swisscom.shopbackend.stats.service;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.ArithmeticOperators;
import org.bson.Document;
import org.springframework.data.mongodb.core.aggregation.ConvertOperators;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatsService {

    private final MongoTemplate mongoTemplate;

    public StatsService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public List<Document> getRevenueByCategory() {
        return mongoTemplate.aggregate(
                Aggregation.newAggregation(
                        Aggregation.unwind("items"),
                        Aggregation.addFields()
                                .addField("productObjectId")
                                .withValue(ConvertOperators.ToObjectId.toObjectId("$items.productId"))
                                .build(),
                        Aggregation.lookup("products", "productObjectId", "_id", "productData"),
                        Aggregation.unwind("productData"),
                        Aggregation.group("productData.category")
                                .sum(ArithmeticOperators.Multiply.valueOf("items.unitPrice")
                                        .multiplyBy("items.quantity")).as("totalRevenue")
                ), "orders", Document.class
        ).getMappedResults();
    }

    public List<Document> getTopProducts() {
        return mongoTemplate.aggregate(
                Aggregation.newAggregation(
                        Aggregation.unwind("items"),
                        Aggregation.group("items.productId")
                                .sum("items.quantity").as("totalQuantity"),
                        Aggregation.sort(Sort.Direction.DESC, "totalQuantity"),
                        Aggregation.limit(5)
                ), "orders", Document.class
        ).getMappedResults();
    }

    public List<Document> getAvgPriceByCategory() {
        return mongoTemplate.aggregate(
                Aggregation.newAggregation(
                        Aggregation.group("category")
                                .avg("price").as("avgPrice")
                ), "products", Document.class
        ).getMappedResults();
    }

    public List<Document> getRevenueByMonth() {
        return mongoTemplate.aggregate(
                Aggregation.newAggregation(
                        Aggregation.unwind("items"),
                        Aggregation.project()
                                .andExpression("month(orderDate)").as("month")
                                .andExpression("items.unitPrice * items.quantity").as("revenue"),
                        Aggregation.group("month")
                                .sum("revenue").as("totalRevenue"),
                        Aggregation.sort(Sort.Direction.ASC, "_id")
                ), "orders", Document.class
        ).getMappedResults();
    }

    public List<Document> getAvgOrderValueByCustomer() {
        return mongoTemplate.aggregate(
                Aggregation.newAggregation(
                        Aggregation.unwind("items"),
                        Aggregation.group("_id")
                                .first("customerName").as("customerName")
                                .sum(ArithmeticOperators.Multiply.valueOf("items.unitPrice")
                                        .multiplyBy("items.quantity")).as("orderTotal"),
                        Aggregation.group("customerName")
                                .avg("orderTotal").as("avgOrderValue")
                ), "orders", Document.class
        ).getMappedResults();
    }
}
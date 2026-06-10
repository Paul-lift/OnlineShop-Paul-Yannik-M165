package ch.swisscom.shopbackend.stats.service;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.ArithmeticOperators;
import org.bson.Document;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatsService {

    private final MongoTemplate mongoTemplate;

    public StatsService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    // 1. Umsatz pro Kategorie
    public List<Document> getRevenueByCategory() {
        return mongoTemplate.aggregate(
                Aggregation.newAggregation(
                        Aggregation.lookup("products", "items.productId", "_id", "productData"),
                        Aggregation.unwind("items"),
                        Aggregation.group("productData.category")
                                .sum(ArithmeticOperators.Multiply.valueOf("items.unitPrice")
                                        .multiplyBy("items.quantity")).as("totalRevenue")
                ), "orders", Document.class
        ).getMappedResults();
    }

    // 2. Top-5 meistbestellte Produkte
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

    // 3. Durchschnittspreis pro Kategorie
    public List<Document> getAvgPriceByCategory() {
        return mongoTemplate.aggregate(
                Aggregation.newAggregation(
                        Aggregation.group("category")
                                .avg("price").as("avgPrice")
                ), "products", Document.class
        ).getMappedResults();
    }

    // 4. Monatlicher Gesamtumsatz
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

    // 5. Durchschnittlicher Bestellwert pro Kunde
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
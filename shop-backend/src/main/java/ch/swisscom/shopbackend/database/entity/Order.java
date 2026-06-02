package ch.swisscom.shopbackend.database.entity;


import ch.swisscom.shopbackend.database.embedded.OrderItem;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Document(collection = "orders")
public class Order {

    @Id
    private String id;
    private String customerName;
    private LocalDate orderDate;
    private String status; // "pending", "shipped", "delivered"
    private List<OrderItem> items;

}

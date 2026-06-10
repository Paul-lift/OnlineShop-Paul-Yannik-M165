package ch.swisscom.shopbackend.database.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@Document(collection = "products")
@AllArgsConstructor
public class Product {

    @Id
    private String id;
    private String name;
    private double price;
    private String category;
    private int stock;
    private List<String> tags;

}
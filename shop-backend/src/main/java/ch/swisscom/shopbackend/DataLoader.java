package ch.swisscom.shopbackend;

import ch.swisscom.shopbackend.database.embedded.OrderItem;
import ch.swisscom.shopbackend.database.entity.Order;
import ch.swisscom.shopbackend.database.entity.Product;
import ch.swisscom.shopbackend.order.repository.OrderRepository;
import ch.swisscom.shopbackend.product.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    public DataLoader(ProductRepository productRepository, OrderRepository orderRepository) {
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
    }

    @Override
    public void run(String... args) {
        // Nur laden wenn DB leer ist
        if (productRepository.count() > 0) return;

        // Produkte
        Product p1 = new Product(null, "iPhone 15", 999.90, "Elektronik", 50, List.of("apple", "smartphone"));
        Product p2 = new Product(null, "Samsung TV", 799.90, "Elektronik", 20, List.of("samsung", "tv"));
        Product p3 = new Product(null, "Nike Schuhe", 129.90, "Kleidung", 100, List.of("nike", "schuhe"));
        Product p4 = new Product(null, "Levi's Jeans", 89.90, "Kleidung", 75, List.of("levis", "jeans"));
        Product p5 = new Product(null, "Java Buch", 49.90, "Bücher", 30, List.of("java", "programmierung"));

        List<Product> savedProducts = productRepository.saveAll(List.of(p1, p2, p3, p4, p5));

        // Orders
        Order o1 = new Order();
        o1.setCustomerName("Paul");
        o1.setOrderDate(LocalDate.of(2026, 1, 15));
        o1.setStatus("delivered");
        o1.setItems(List.of(
                new OrderItem(savedProducts.get(0).getId(), 1, 999.90),
                new OrderItem(savedProducts.get(2).getId(), 2, 129.90)
        ));

        Order o2 = new Order();
        o2.setCustomerName("Anna");
        o2.setOrderDate(LocalDate.of(2026, 2, 20));
        o2.setStatus("shipped");
        o2.setItems(List.of(
                new OrderItem(savedProducts.get(1).getId(), 1, 799.90)
        ));

        Order o3 = new Order();
        o3.setCustomerName("Paul");
        o3.setOrderDate(LocalDate.of(2026, 3, 5));
        o3.setStatus("pending");
        o3.setItems(List.of(
                new OrderItem(savedProducts.get(4).getId(), 3, 49.90),
                new OrderItem(savedProducts.get(3).getId(), 1, 89.90)
        ));

        Order o4 = new Order();
        o4.setCustomerName("Marco");
        o4.setOrderDate(LocalDate.of(2026, 3, 18));
        o4.setStatus("delivered");
        o4.setItems(List.of(
                new OrderItem(savedProducts.get(0).getId(), 2, 999.90),
                new OrderItem(savedProducts.get(1).getId(), 1, 799.90)
        ));

        orderRepository.saveAll(List.of(o1, o2, o3, o4));

        System.out.println("Testdaten geladen!");
    }
}
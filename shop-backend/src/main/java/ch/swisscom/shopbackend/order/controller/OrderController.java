package ch.swisscom.shopbackend.order.controller;

import ch.swisscom.shopbackend.database.entity.Order;
import ch.swisscom.shopbackend.order.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        return ResponseEntity.status(201).body(orderService.createOrder(order));
    }

    @GetMapping("/customer/{customerName}")
    public List<Order> getOrdersByCustomer(@PathVariable String customerName) {
        return orderService.getOrdersByCustomer(customerName);
    }
}
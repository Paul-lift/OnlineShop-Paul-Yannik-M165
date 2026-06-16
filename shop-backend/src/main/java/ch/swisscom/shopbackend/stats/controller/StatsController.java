package ch.swisscom.shopbackend.stats.controller;

import ch.swisscom.shopbackend.stats.service.StatsService;
import org.bson.Document;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/stats")
public class StatsController {

    private final StatsService statsService;

    public StatsController(StatsService statsService) {
        this.statsService = statsService;
    }

    @GetMapping("/revenue-by-category")
    public List<Document> getRevenueByCategory() {
        return statsService.getRevenueByCategory();
    }

    @GetMapping("/top-products")
    public List<Document> getTopProducts() {
        return statsService.getTopProducts();
    }

    @GetMapping("/avg-price-by-category")
    public List<Document> getAvgPriceByCategory() {
        return statsService.getAvgPriceByCategory();
    }

    @GetMapping("/revenue-by-month")
    public List<Document> getRevenueByMonth() {
        return statsService.getRevenueByMonth();
    }

    @GetMapping("/avg-order-value")
    public List<Document> getAvgOrderValueByCustomer() {
        return statsService.getAvgOrderValueByCustomer();
    }
}
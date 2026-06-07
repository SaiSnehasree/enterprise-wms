package com.sneha.wms.controller;

import com.sneha.wms.entity.Order;
import com.sneha.wms.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService
            orderService;

    @GetMapping("/add-sample")
    public Order
    addSampleOrder() {

        Order order =
                new Order();

        order.setQuantity(
                3
        );

        order.setProduct(
                new com.sneha.wms.entity.Product()
        );

        order.getProduct()
                .setId(1L);

        return orderService
                .addOrder(order);
    }
    // CREATE ORDER
    @PostMapping
    public Order addOrder(
            @RequestBody Order order
    ) {

        return orderService
                .addOrder(order);
    }

    // GET ALL ORDERS
    @GetMapping
    public List<Order>
    getAllOrders() {

        return orderService
                .getAllOrders();
    }

    // GET ORDER BY ID
    @GetMapping("/{id}")
    public Order
    getOrderById(
            @PathVariable Long id
    ) {

        return orderService
                .getOrderById(id);
    }

    // UPDATE ORDER STATUS
    @GetMapping(
            "/{id}/status"
    )
    public Order
    updateOrderStatus(
            @PathVariable Long id,

            @RequestParam
            String status
    ) {

        return orderService
                .updateOrderStatus(
                        id,
                        status
                );
    }

    // DELETE ORDER
    @DeleteMapping("/{id}")
    public String
    deleteOrder(
            @PathVariable Long id
    ) {

        orderService
                .deleteOrder(id);

        return
                "Order deleted successfully!";
    }
}
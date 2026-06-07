package com.sneha.wms.service;

import com.sneha.wms.entity.InventoryItem;
import com.sneha.wms.entity.Order;
import com.sneha.wms.exception.ResourceNotFoundException;
import com.sneha.wms.repository.InventoryItemRepository;
import com.sneha.wms.repository.OrderRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository
            orderRepository;

    @Autowired
    private InventoryItemRepository
            inventoryItemRepository;

    // CREATE ORDER
    public Order addOrder(
            Order order
    ) {

        order.setStatus(
                "Pending"
        );

        return orderRepository
                .save(order);
    }

    // GET ALL ORDERS
    public List<Order>
    getAllOrders() {

        return orderRepository
                .findAll();
    }

    // UPDATE ORDER STATUS
    @Transactional
    public Order updateOrderStatus(
            Long orderId,
            String status
    ) {

        Order order =
                orderRepository
                        .findById(orderId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Order not found"
                                ));

        // If order becomes PACKED
        // reduce stock
        if (
                status.equalsIgnoreCase(
                        "Packed"
                )
        ) {

            InventoryItem
                    inventoryItem =
                    inventoryItemRepository
                            .findFirstByProductId(
                                    order.getProduct()
                                            .getId()
                            )
                            .orElseThrow(() ->
                                    new ResourceNotFoundException(
                                            "Inventory not found"
                                    ));

            Integer availableStock =
                    inventoryItem
                            .getStockQuantity();

            // insufficient stock
            if (
                    availableStock
                            < order.getQuantity()
            ) {

                throw new RuntimeException(
                        "Insufficient Stock!"
                );
            }

            inventoryItem
                    .setStockQuantity(
                            availableStock
                                    - order.getQuantity()
                    );

            inventoryItemRepository
                    .save(
                            inventoryItem
                    );
        }

        order.setStatus(
                status
        );

        return orderRepository
                .save(order);
    }

    // GET ORDER BY ID
    public Order
    getOrderById(
            Long id
    ) {

        return orderRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found"
                        ));
    }

    // DELETE ORDER
    public void
    deleteOrder(
            Long id
    ) {

        orderRepository
                .deleteById(id);
    }
}
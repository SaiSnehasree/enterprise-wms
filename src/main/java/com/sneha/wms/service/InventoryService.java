package com.sneha.wms.service;

import com.sneha.wms.entity.InventoryItem;
import com.sneha.wms.repository.InventoryItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sneha.wms.exception.ResourceNotFoundException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class InventoryService {

    @Autowired
    private InventoryItemRepository
            inventoryItemRepository;

    // Add Inventory
    public InventoryItem addInventory(
            InventoryItem item) {

        return inventoryItemRepository
                .save(item);
    }

    // Get All Inventory
    public List<InventoryItem>
    getAllInventory() {

        return inventoryItemRepository
                .findAll();
    }

    // LOW STOCK ITEMS
    public List<InventoryItem>
    getLowStockItems() {

        return inventoryItemRepository
                .findByStockQuantityLessThan(10);
    }

    // WAREHOUSE ANALYTICS
    public List<Map<String, Object>>
    getWarehouseAnalytics() {

        List<Object[]> results =
                inventoryItemRepository
                        .getWarehouseAnalytics();

        List<Map<String, Object>>
                analytics =
                new ArrayList<>();

        for (Object[] row : results) {

            Map<String, Object>
                    warehouseData =
                    new HashMap<>();

            warehouseData.put(
                    "name",
                    row[0]
            );

            warehouseData.put(
                    "stock",
                    row[1]
            );

            analytics.add(
                    warehouseData
            );
        }

        return analytics;
    }

    public InventoryItem
    getInventoryById(Long id) {

        return inventoryItemRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Inventory not found with id: "
                                        + id));
    }

    public InventoryItem
    updateInventory(
            Long id,
            InventoryItem updatedItem) {

        InventoryItem existingItem =
                inventoryItemRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Inventory not found with id: "
                                                + id));

        existingItem.setStockQuantity(
                updatedItem.getStockQuantity());

        existingItem.setStatus(
                updatedItem.getStatus());

        return inventoryItemRepository
                .save(existingItem);
    }

    public void deleteInventory(
            Long id) {

        InventoryItem item =
                getInventoryById(id);

        inventoryItemRepository
                .delete(item);
    }
}
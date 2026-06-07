package com.sneha.wms.service;

import com.sneha.wms.entity.InventoryItem;
import com.sneha.wms.entity.Product;
import com.sneha.wms.entity.StorageBin;
import com.sneha.wms.entity.Warehouse;
import com.sneha.wms.repository.InventoryItemRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sneha.wms.exception.ResourceNotFoundException;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class InventoryService {

    @Autowired
    private InventoryItemRepository
            inventoryItemRepository;

    @Autowired
    private StorageBinService
            storageBinService;

    // Add Inventory
    public InventoryItem addInventory(
            InventoryItem item) {

        return inventoryItemRepository
                .save(item);
    }

    // RECEIVE SHIPMENT
    @Transactional
    public InventoryItem receiveShipment(
            Long productId,
            Long warehouseId,
            Integer quantity
    ) {

        Optional<InventoryItem>
                existingInventory =
                inventoryItemRepository
                        .findByProductIdAndWarehouseId(
                                productId,
                                warehouseId
                        );
        // Find available storage bin
        StorageBin availableBin =
                storageBinService
                        .findAvailableBin(
                                warehouseId
                        );

        if (availableBin == null) {

            throw new RuntimeException(
                    "No available storage bin found!"
            );
        }

        // Inventory already exists
        if (!existingInventory.isEmpty()) {

            InventoryItem item =
                    existingInventory.get();

            item.setStockQuantity(
                    item.getStockQuantity()
                            + quantity
            );

            // assign storage bin
            item.setStorageBin(
                    availableBin
            );

            // mark occupied
            availableBin.setOccupied(
                    true
            );

            return inventoryItemRepository
                    .save(item);
        }

        // Create new inventory
        InventoryItem newItem =
                new InventoryItem();

        Product product =
                new Product();

        product.setId(productId);

        Warehouse warehouse =
                new Warehouse();

        warehouse.setId(warehouseId);

        newItem.setProduct(product);

        newItem.setWarehouse(
                warehouse
        );

        // assign bin
        newItem.setStorageBin(
                availableBin
        );

        // mark occupied
        availableBin.setOccupied(
                true
        );

        newItem.setStockQuantity(
                quantity
        );

        newItem.setStatus(
                "Available"
        );

        return inventoryItemRepository
                .save(newItem);
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
package com.sneha.wms.controller;

import com.sneha.wms.entity.InventoryItem;
import com.sneha.wms.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.sneha.wms.entity.Product;
import com.sneha.wms.entity.Warehouse;
import java.util.List;

@RestController
@RequestMapping("/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    // Add Inventory
    @PostMapping
    public InventoryItem addInventory(@RequestBody InventoryItem item) {
        return inventoryService.addInventory(item);
    }

    // Get All Inventory
    @GetMapping
    public List<InventoryItem> getAllInventory() {
        return inventoryService.getAllInventory();
    }

    @GetMapping("/test")
    public String inventoryTest() {
        return "Inventory API Working!";
    }
    @GetMapping("/add-sample")
    public InventoryItem addSampleInventory() {

        Product product = new Product();
        product.setId(1L);

        Warehouse warehouse = new Warehouse();
        warehouse.setId(1L);

        InventoryItem item = new InventoryItem();

        item.setStockQuantity(10);
        item.setStatus("Available");
        item.setProduct(product);
        item.setWarehouse(warehouse);

        return inventoryService.addInventory(item);
    }
}
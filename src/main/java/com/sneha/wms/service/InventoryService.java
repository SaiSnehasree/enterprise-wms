package com.sneha.wms.service;

import com.sneha.wms.entity.InventoryItem;
import com.sneha.wms.repository.InventoryItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {

    @Autowired
    private InventoryItemRepository inventoryItemRepository;

    // Add Inventory
    public InventoryItem addInventory(InventoryItem item) {
        return inventoryItemRepository.save(item);
    }

    // Get All Inventory
    public List<InventoryItem> getAllInventory() {
        return inventoryItemRepository.findAll();
    }
}
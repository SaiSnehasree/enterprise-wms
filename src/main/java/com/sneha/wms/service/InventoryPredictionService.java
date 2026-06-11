package com.sneha.wms.service;

import com.sneha.wms.entity.InventoryItem;

import com.sneha.wms.repository
        .InventoryItemRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Service
public class InventoryPredictionService {

    @Autowired
    private InventoryItemRepository
            inventoryRepository;

    public List<Map<String, Object>>
    getReorderPredictions() {

        List<InventoryItem>
                inventories =

                inventoryRepository
                        .findAll();

        List<Map<String, Object>>
                predictions =

                new ArrayList<>();

        for (

                InventoryItem inventory
                : inventories
        ) {

            Map<String, Object>
                    data =

                    new HashMap<>();

            int stock =
                    inventory
                            .getStockQuantity();

            String priority;

            int suggestedReorder;

            if (stock < 20) {

                priority =
                        "HIGH";

                suggestedReorder =
                        50;

            }

            else if (
                    stock < 50
            ) {

                priority =
                        "MEDIUM";

                suggestedReorder =
                        30;
            }

            else {

                priority =
                        "HEALTHY";

                suggestedReorder =
                        0;
            }

            data.put(
                    "product",
                    inventory
                            .getProduct()
                            .getProductName()
            );

            data.put(
                    "currentStock",
                    stock
            );

            data.put(
                    "priority",
                    priority
            );

            data.put(
                    "suggestedReorder",
                    suggestedReorder
            );

            predictions.add(
                    data
            );
        }

        return predictions;
    }
}
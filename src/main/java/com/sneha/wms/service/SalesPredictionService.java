package com.sneha.wms.service;

import com.sneha.wms.entity.InventoryItem;

import com.sneha.wms.repository
        .InventoryItemRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SalesPredictionService {

    @Autowired
    private InventoryItemRepository
            inventoryRepository;

    public List<Map<String, Object>>
    getSalesPrediction() {

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

            int currentStock =
                    inventory
                            .getStockQuantity();

            int dailyConsumption;

            if (currentStock < 20) {

                dailyConsumption = 2;
            }

            else if (
                    currentStock < 50
            ) {

                dailyConsumption = 1;
            }

            else {

                dailyConsumption = 0;
            }

            for (
                    int day = 1;
                    day <= 7;
                    day++
            ) {

                Map<String, Object>
                        point =

                        new HashMap<>();

                int predictedStock =
                        Math.max(
                                currentStock
                                        - (
                                        dailyConsumption
                                                * day
                                ),
                                0
                        );

                point.put(
                        "product",
                        inventory
                                .getProduct()
                                .getProductName()
                );

                point.put(
                        "day",
                        "Day " + day
                );

                point.put(
                        "stock",
                        predictedStock
                );

                predictions.add(
                        point
                );
            }
        }

        return predictions;
    }
}
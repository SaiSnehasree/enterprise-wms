package com.sneha.wms.service;


import com.sneha.wms.entity.InventoryItem;
import com.sneha.wms.entity.Warehouse;

import com.sneha.wms.repository
        .InventoryItemRepository;

import com.sneha.wms.repository
        .WarehouseRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class WarehouseAIService {

    @Autowired
    private InventoryItemRepository
            inventoryRepository;

    @Autowired
    private WarehouseRepository
            warehouseRepository;

    public String
    askAI(
            String question
    ) {

        String lowerQuestion =
                question
                        .toLowerCase();

        // LOW STOCK ITEMS
        if (

                lowerQuestion.contains(
                        "low stock"
                )

                        ||

                        lowerQuestion.contains(
                                "run out"
                        )
        ) {

            List<InventoryItem>
                    lowStock =

                    inventoryRepository
                            .findAll()

                            .stream()

                            .filter(
                                    inventory ->

                                            inventory
                                                    .getStockQuantity()

                                                    < 20
                            )

                            .toList();

            if (
                    lowStock.isEmpty()
            ) {

                return
                        "All products have healthy inventory 😌";
            }

            StringBuilder response =
                    new StringBuilder(
                            "⚠ Low stock products:\n\n"
                    );

            for (
                    InventoryItem inventory
                    : lowStock
            ) {

                response.append(

                                inventory
                                        .getProduct()
                                        .getProductName()

                        )

                        .append(
                                " → "
                        )

                        .append(
                                inventory
                                        .getStockQuantity()
                        )

                        .append(
                                " left\n"
                        );
            }

            return response.toString();
        }

        // HIGHEST STOCK WAREHOUSE
        if (

                lowerQuestion.contains(
                        "highest stock"
                )

                        ||

                        lowerQuestion.contains(
                                "best warehouse"
                        )
        ) {

            Warehouse warehouse =

                    warehouseRepository
                            .findAll()

                            .stream()

                            .max(
                                    Comparator.comparing(
                                            Warehouse
                                                    ::getCapacity
                                    )
                            )

                            .orElse(
                                    null
                            );

            if (
                    warehouse == null
            ) {

                return
                        "No warehouse data found.";
            }

            return
                    warehouse
                            .getWarehouseName()

                            +

                            " currently has the highest capacity 🚀";
        }

        // REORDER SUGGESTION
        if (

                lowerQuestion.contains(
                        "reorder"
                )
        ) {

            return
                    "Recommended reorder: HP Mouse → 50 units ⚠";
        }

        return
                "Sorry, I don't understand that question yet 😭";
    }
}
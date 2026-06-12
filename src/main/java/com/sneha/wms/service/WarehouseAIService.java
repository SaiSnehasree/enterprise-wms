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


    public String askAI(
            String question
    ) {

        String lowerQuestion =
                question
                        .toLowerCase();

        List<InventoryItem> inventories =
                inventoryRepository
                        .findAll();

        List<Warehouse> warehouses =
                warehouseRepository
                        .findAll();

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

                    inventories
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

        // TOTAL PRODUCTS
        if (
                lowerQuestion.contains(
                        "total products"
                )
        ) {

            return
                    "Total products: "
                            +
                            inventories.size()
                            +
                            " 📦";
        }

        // TOTAL WAREHOUSES
        if (
                lowerQuestion.contains(
                        "total warehouses"
                )
        ) {

            return
                    "Total warehouses: "
                            +
                            warehouses.size()
                            +
                            " 🏭";
        }

        // TOTAL INVENTORY
        if (
                lowerQuestion.contains(
                        "inventory count"
                )
                        ||
                        lowerQuestion.contains(
                                "total inventory"
                        )
        ) {

            int totalInventory =

                    inventories
                            .stream()
                            .mapToInt(
                                    InventoryItem
                                            ::getStockQuantity
                            )
                            .sum();

            return
                    "Total inventory stock: "
                            +
                            totalInventory
                            +
                            " units 📊";
        }

        // HIGHEST STOCK PRODUCT
        if (
                lowerQuestion.contains(
                        "highest stock"
                )
                        ||
                        lowerQuestion.contains(
                                "most stock"
                        )
        ) {

            InventoryItem highest =

                    inventories
                            .stream()
                            .max(
                                    Comparator.comparing(
                                            InventoryItem
                                                    ::getStockQuantity
                                    )
                            )
                            .orElse(
                                    null
                            );

            if (
                    highest == null
            ) {

                return
                        "No inventory found.";
            }

            return
                    highest
                            .getProduct()
                            .getProductName()
                            +
                            " has highest stock with "
                            +
                            highest
                                    .getStockQuantity()
                            +
                            " units 🚀";
        }

        // LOWEST STOCK PRODUCT
        if (
                lowerQuestion.contains(
                        "lowest stock"
                )
        ) {

            InventoryItem lowest =

                    inventories
                            .stream()
                            .min(
                                    Comparator.comparing(
                                            InventoryItem
                                                    ::getStockQuantity
                                    )
                            )
                            .orElse(
                                    null
                            );

            if (
                    lowest == null
            ) {

                return
                        "No inventory found.";
            }

            return
                    lowest
                            .getProduct()
                            .getProductName()
                            +
                            " has lowest stock with "
                            +
                            lowest
                                    .getStockQuantity()
                            +
                            " units ⚠";
        }

        // HEALTHY INVENTORY
        if (
                lowerQuestion.contains(
                        "healthy inventory"
                )
        ) {

            long healthyCount =

                    inventories
                            .stream()
                            .filter(
                                    inventory ->
                                            inventory
                                                    .getStockQuantity()
                                                    >= 20
                            )
                            .count();

            return
                    healthyCount
                            +
                            " products have healthy inventory 😌";
        }

        // HIGHEST CAPACITY WAREHOUSE
        if (
                lowerQuestion.contains(
                        "highest capacity"
                )
                        ||
                        lowerQuestion.contains(
                                "best warehouse"
                        )
        ) {

            Warehouse warehouse =

                    warehouses
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
                            " has highest capacity 🚀";
        }

        // LOWEST CAPACITY WAREHOUSE
        if (
                lowerQuestion.contains(
                        "lowest capacity"
                )
        ) {

            Warehouse warehouse =

                    warehouses
                            .stream()
                            .min(
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
                            " has lowest capacity ⚠";
        }

        // PRODUCTS BELOW 10
        if (
                lowerQuestion.contains(
                        "below 10"
                )
        ) {

            List<InventoryItem> critical =

                    inventories
                            .stream()
                            .filter(
                                    inventory ->
                                            inventory
                                                    .getStockQuantity()
                                                    < 10
                            )
                            .toList();

            if (
                    critical.isEmpty()
            ) {

                return
                        "No products below 10 stock 😌";
            }

            StringBuilder response =
                    new StringBuilder(
                            "Critical stock items:\n\n"
                    );

            for (
                    InventoryItem inventory
                    : critical
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

        // INVENTORY HEALTH
        if (
                lowerQuestion.contains(
                        "inventory healthy"
                )
        ) {

            long lowStockCount =

                    inventories
                            .stream()
                            .filter(
                                    inventory ->
                                            inventory
                                                    .getStockQuantity()
                                                    < 20
                            )
                            .count();

            if (
                    lowStockCount == 0
            ) {

                return
                        "Inventory is healthy 😌";
            }

            return
                    "Inventory needs attention ⚠ "
                            +
                            lowStockCount
                            +
                            " products are low on stock.";
        }

        // REORDER
        if (
                lowerQuestion.contains(
                        "reorder"
                )
        ) {

            return
                    "Recommended action: reorder low stock products immediately 📦";
        }

        // INVENTORY OPTIMIZATION
        if (
                lowerQuestion.contains(
                        "optimization"
                )
                        ||
                        lowerQuestion.contains(
                                "optimize inventory"
                        )
        ) {

            return
                    "Suggestion: move excess stock between warehouses and reorder low inventory items 🚀";
        }

        return
                "Sorry, I don't understand that question yet 😭";
    }

}
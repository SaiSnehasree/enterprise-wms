package com.sneha.wms.repository;

import com.sneha.wms.entity.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface InventoryItemRepository
        extends JpaRepository<InventoryItem, Long> {

    // LOW STOCK
    List<InventoryItem>
    findByStockQuantityLessThan(
            Integer quantity
    );

    // WAREHOUSE ANALYTICS
    @Query("""
            SELECT
            i.warehouse.warehouseName,
            SUM(i.stockQuantity)
            FROM InventoryItem i
            GROUP BY i.warehouse.warehouseName
            """)
    List<Object[]>
    getWarehouseAnalytics();

    // FIND INVENTORY BY
    // PRODUCT + WAREHOUSE
    Optional<InventoryItem>
    findByProductIdAndWarehouseId(
            Long productId,
            Long warehouseId
    );
}
package com.sneha.wms.repository;

import com.sneha.wms.entity.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

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
}
package com.sneha.wms.repository;

import com.sneha.wms.entity.StorageBin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StorageBinRepository
        extends JpaRepository<
        StorageBin,
        Long> {

    List<StorageBin>
    findByWarehouseId(
            Long warehouseId
    );
}
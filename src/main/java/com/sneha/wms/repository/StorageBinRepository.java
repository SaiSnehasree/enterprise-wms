package com.sneha.wms.repository;

import com.sneha.wms.entity.StorageBin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StorageBinRepository
        extends JpaRepository<
        StorageBin,
        Long> {

    // GET BINS BY WAREHOUSE
    List<StorageBin>
    findByWarehouseId(
            Long warehouseId
    );

    // FIND FIRST AVAILABLE BIN
    Optional<StorageBin>
    findFirstByWarehouseIdAndOccupiedFalse(
            Long warehouseId
    );
}
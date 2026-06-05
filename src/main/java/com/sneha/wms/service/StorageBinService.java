package com.sneha.wms.service;

import com.sneha.wms.entity.StorageBin;
import com.sneha.wms.repository.StorageBinRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StorageBinService {

    @Autowired
    private StorageBinRepository
            storageBinRepository;

    // ADD BIN
    public StorageBin addBin(
            StorageBin bin
    ) {

        return storageBinRepository
                .save(bin);
    }

    // GET ALL BINS
    public List<StorageBin>
    getAllBins() {

        return storageBinRepository
                .findAll();
    }

    // GET BINS BY WAREHOUSE
    public List<StorageBin>
    getBinsByWarehouse(
            Long warehouseId
    ) {

        return storageBinRepository
                .findByWarehouseId(
                        warehouseId
                );
    }

    // FIND AVAILABLE BIN
    public StorageBin
    findAvailableBin(
            Long warehouseId
    ) {

        return storageBinRepository
                .findFirstByWarehouseIdAndOccupiedFalse(
                        warehouseId
                )
                .orElse(null);
    }

    // GET BIN BY ID
    public StorageBin
    getBinById(Long id) {

        return storageBinRepository
                .findById(id)
                .orElse(null);
    }

    // DELETE BIN
    public void deleteBin(
            Long id
    ) {

        storageBinRepository
                .deleteById(id);
    }
}
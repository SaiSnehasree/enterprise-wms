package com.sneha.wms.controller;

import com.sneha.wms.entity.StorageBin;
import com.sneha.wms.entity.Warehouse;
import com.sneha.wms.service.StorageBinService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/storage-bin")
public class StorageBinController {

    @Autowired
    private StorageBinService
            storageBinService;

    // ADD BIN
    @PostMapping
    public StorageBin addBin(
            @RequestBody StorageBin bin
    ) {

        return storageBinService
                .addBin(bin);
    }

    // GET ALL BINS
    @GetMapping
    public List<StorageBin>
    getAllBins() {

        return storageBinService
                .getAllBins();
    }

    // ADD SAMPLE BIN
    @GetMapping("/add-sample")
    public StorageBin addSampleBin() {

        StorageBin bin =
                new StorageBin();

        bin.setBinCode("A1");

        bin.setCapacity(100);

        bin.setOccupied(false);

        Warehouse warehouse =
                new Warehouse();

        warehouse.setId(1L);

        bin.setWarehouse(
                warehouse
        );

        return storageBinService
                .addBin(bin);
    }

    // GET BINS BY WAREHOUSE
    @GetMapping("/warehouse/{id}")
    public List<StorageBin>
    getBinsByWarehouse(
            @PathVariable Long id
    ) {

        return storageBinService
                .getBinsByWarehouse(id);
    }

    // GET BIN BY ID
    // ADD SAMPLE BIN
    @GetMapping("/add-sample/{code}")
    public StorageBin addSampleBin(
            @PathVariable String code
    ) {

        StorageBin bin =
                new StorageBin();

        bin.setBinCode(code);

        bin.setCapacity(100);

        bin.setOccupied(false);

        Warehouse warehouse =
                new Warehouse();

        warehouse.setId(1L);

        bin.setWarehouse(
                warehouse
        );

        return storageBinService
                .addBin(bin);
    }

    // DELETE BIN
    @DeleteMapping("/{id}")
    public String deleteBin(
            @PathVariable Long id
    ) {

        storageBinService
                .deleteBin(id);

        return "Storage bin deleted successfully!";
    }
}
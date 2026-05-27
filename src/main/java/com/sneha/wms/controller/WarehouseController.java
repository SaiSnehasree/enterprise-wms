package com.sneha.wms.controller;

import com.sneha.wms.entity.Warehouse;
import com.sneha.wms.service.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/warehouse")
public class WarehouseController {

    @Autowired
    private WarehouseService warehouseService;

    // Add Warehouse
    @PostMapping
    public Warehouse addWarehouse(@RequestBody Warehouse warehouse) {
        return warehouseService.addWarehouse(warehouse);
    }

    // Get All Warehouses
    @GetMapping
    public List<Warehouse> getAllWarehouses() {
        return warehouseService.getAllWarehouses();
    }

    // Test API
    @GetMapping("/test")
    public String testWarehouseApi() {
        return "Warehouse API Working!";
    }

    @GetMapping("/add-sample")
    public Warehouse addSampleWarehouse() {

        Warehouse warehouse = new Warehouse();

        warehouse.setWarehouseName("Main Warehouse");
        warehouse.setLocation("Hyderabad");
        warehouse.setCapacity(1000);

        return warehouseService.addWarehouse(warehouse);
    }
}
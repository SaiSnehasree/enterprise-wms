package com.sneha.wms.service;

import com.sneha.wms.entity.Warehouse;
import com.sneha.wms.repository.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sneha.wms.exception.ResourceNotFoundException;
import java.util.List;

@Service
public class WarehouseService {

    @Autowired
    private WarehouseRepository warehouseRepository;

    // Add Warehouse
    public Warehouse addWarehouse(Warehouse warehouse) {
        return warehouseRepository.save(warehouse);
    }

    // Get All Warehouses
    public List<Warehouse> getAllWarehouses() {
        return warehouseRepository.findAll();
    }

    public Warehouse updateWarehouse(
            Long id,
            Warehouse updatedWarehouse) {

        Warehouse existingWarehouse =
                warehouseRepository.findById(id)
                        .orElse(null);

        if (existingWarehouse != null) {

            existingWarehouse.setWarehouseName(
                    updatedWarehouse.getWarehouseName());

            existingWarehouse.setLocation(
                    updatedWarehouse.getLocation());

            existingWarehouse.setCapacity(
                    updatedWarehouse.getCapacity());

            return warehouseRepository
                    .save(existingWarehouse);
        }

        return null;
    }

    public Warehouse getWarehouseById(Long id) {
        return warehouseRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Warehouse not found with id: "
                                        + id));
    }

    public void deleteWarehouse(Long id) {

        Warehouse warehouse =
                getWarehouseById(id);

        warehouseRepository.delete(warehouse);
    }
}
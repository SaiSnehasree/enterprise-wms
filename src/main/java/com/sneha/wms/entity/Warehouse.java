package com.sneha.wms.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "warehouses")
@Data
public class Warehouse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String warehouseName;

    private String location;

    private Integer capacity;

    @OneToMany(mappedBy = "warehouse")
    private List<InventoryItem> inventoryItems;
}
package com.sneha.wms.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "inventory_items")
@Data
public class InventoryItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String itemName;

    private Integer stockQuantity;

    private String status;
}
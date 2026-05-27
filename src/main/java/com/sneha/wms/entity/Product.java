package com.sneha.wms.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
@Table(name = "products")
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sku;

    private String productName;

    private String description;

    private Double price;

    private Integer quantity;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private List<InventoryItem> inventoryItems;
}
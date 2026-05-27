package com.sneha.wms.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "products")
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sku;

    @NotBlank(message =
            "Product name cannot be empty")
    private String productName;

    private String description;

    @NotNull(message =
            "Price is required")
    @Min(value = 1,
            message =
                    "Price must be greater than 0")
    private Double price;

    @NotNull(message =
            "Quantity is required")
    @Min(value = 0,
            message =
                    "Quantity cannot be negative")
    private Integer quantity;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private List<InventoryItem> inventoryItems;
}
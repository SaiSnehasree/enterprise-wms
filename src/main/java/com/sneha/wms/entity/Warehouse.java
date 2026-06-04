package com.sneha.wms.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "warehouses")
@Data
public class Warehouse {

    @Id
    @GeneratedValue(
            strategy =
                    GenerationType.IDENTITY
    )
    private Long id;

    private String warehouseName;

    private String location;

    private Integer capacity;

    // INVENTORY ITEMS
    @OneToMany(
            mappedBy = "warehouse"
    )
    @JsonIgnore
    private List<InventoryItem>
            inventoryItems;

    // STORAGE BINS
    @OneToMany(
            mappedBy = "warehouse"
    )
    @JsonIgnore
    private List<StorageBin>
            storageBins;
}
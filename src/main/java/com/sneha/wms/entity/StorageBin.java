package com.sneha.wms.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "storage_bins")
@Data
public class StorageBin {

    @Id
    @GeneratedValue(strategy =
            GenerationType.IDENTITY)
    private Long id;

    private String binCode;

    private Integer capacity;

    private Boolean occupied;

    @ManyToOne
    @JoinColumn(
            name = "warehouse_id"
    )
    private Warehouse warehouse;
}
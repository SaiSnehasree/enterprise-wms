package com.sneha.wms.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "storage_bins")
@Data
public class StorageBin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String binCode;

    private String section;

    private Integer maxCapacity;
}
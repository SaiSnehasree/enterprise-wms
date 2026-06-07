package com.sneha.wms.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "orders")
@Data
public class Order {

    @Id
    @GeneratedValue(
            strategy =
                    GenerationType.IDENTITY
    )
    private Long id;

    private Integer quantity;

    private String status;

    @ManyToOne
    @JoinColumn(
            name = "product_id"
    )
    private Product product;
}
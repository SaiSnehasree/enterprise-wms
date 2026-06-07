package com.sneha.wms.repository;

import com.sneha.wms.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository
        extends JpaRepository<
        Order,
        Long
        > {
}
package com.sneha.wms.controller;

import com.sneha.wms.service
        .InventoryPredictionService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation
        .GetMapping;

import org.springframework.web.bind.annotation
        .RequestMapping;

import org.springframework.web.bind.annotation
        .RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(
        "/inventory"
)
public class
InventoryPredictionController {

    @Autowired
    private
    InventoryPredictionService
            inventoryPredictionService;

    @GetMapping(
            "/reorder-predictions"
    )
    public
    List<Map<String, Object>>
    getPredictions() {

        return
                inventoryPredictionService
                        .getReorderPredictions();
    }
}
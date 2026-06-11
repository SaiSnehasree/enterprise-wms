package com.sneha.wms.controller;

import com.sneha.wms.service
        .SalesPredictionService;

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
SalesPredictionController {

    @Autowired
    private
    SalesPredictionService
            salesPredictionService;

    @GetMapping(
            "/sales-prediction"
    )
    public
    List<Map<String, Object>>
    getSalesPrediction() {

        return
                salesPredictionService
                        .getSalesPrediction();
    }
}
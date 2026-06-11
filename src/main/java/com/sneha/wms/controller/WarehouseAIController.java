package com.sneha.wms.controller;

import com.sneha.wms.service
        .WarehouseAIService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation
        .GetMapping;

import org.springframework.web.bind.annotation
        .RequestParam;

import org.springframework.web.bind.annotation
        .RequestMapping;

import org.springframework.web.bind.annotation
        .RestController;

@RestController
@RequestMapping(
        "/ai"
)
public class
WarehouseAIController {

    @Autowired
    private
    WarehouseAIService
            warehouseAIService;

    @GetMapping(
            "/ask"
    )
    public String askAI(

            @RequestParam
            String question
    ) {

        return
                warehouseAIService
                        .askAI(
                                question
                        );
    }
}
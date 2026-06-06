package com.sneha.wms.controller;

import com.google.zxing.WriterException;
import com.sneha.wms.entity.Product;
import com.sneha.wms.service.BarcodeService;
import com.sneha.wms.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sneha.wms.dto.ProductDTO;

import jakarta.validation.Valid;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService
            productService;

    @Autowired
    private BarcodeService
            barcodeService;

    // ADD PRODUCT
    @PostMapping
    public Product addProduct(
            @Valid
            @RequestBody Product product
    ) {

        return productService
                .addProduct(product);
    }

    // GET ALL PRODUCTS
    @GetMapping
    public List<Product>
    getAllProducts() {

        return productService
                .getAllProducts();
    }

    // GET PRODUCT BY ID
    @GetMapping("/{id}")
    public Product getProductById(
            @PathVariable Long id
    ) {

        return productService
                .getProductById(id);
    }
    @GetMapping(
            value = "/qr/{id}",
            produces = "image/png"
    )
    public byte[]
    generateQRCode(
            @PathVariable Long id
    )
            throws Exception {

        Product product =
                productService
                        .getProductById(id);

        String filePath =
                barcodeService
                        .generateQRCode(
                                product.getSku()
                        );

        return java.nio.file.Files
                .readAllBytes(
                        java.nio.file.Paths
                                .get(filePath)
                );
    }

    // DELETE PRODUCT
    @DeleteMapping("/{id}")
    public String deleteProduct(
            @PathVariable Long id
    ) {

        productService
                .deleteProduct(id);

        return
                "Product deleted successfully!";
    }

    @GetMapping("/test")
    public String testApi() {

        return
                "WMS Product API Working!";
    }

    // ADD SAMPLE PRODUCT
    @GetMapping("/add-sample")
    public Product addSampleProduct() {

        Product product =
                new Product();

        product.setSku(
                "SKU001"
        );

        product.setProductName(
                "Laptop"
        );

        product.setDescription(
                "Dell Gaming Laptop"
        );

        product.setPrice(
                75000.0
        );

        product.setQuantity(
                10
        );

        return productService
                .addProduct(product);
    }

    // UPDATE PRODUCT
    @PutMapping("/{id}")
    public Product updateProduct(
            @PathVariable Long id,

            @Valid
            @RequestBody Product product
    ) {

        return productService
                .updateProduct(
                        id,
                        product
                );
    }

    @GetMapping("/update-sample")
    public Product
    updateSampleProduct() {

        Product updatedProduct =
                new Product();

        updatedProduct.setSku(
                "SKU001"
        );

        updatedProduct.setProductName(
                "Dell Gaming Laptop Pro"
        );

        updatedProduct.setDescription(
                "Updated Gaming Laptop"
        );

        updatedProduct.setPrice(
                90000.0
        );

        updatedProduct.setQuantity(
                20
        );

        return productService
                .updateProduct(
                        1L,
                        updatedProduct
                );
    }

    // DTO API
    @GetMapping("/dto")
    public List<ProductDTO>
    getAllProductDTOs() {

        return productService
                .getAllProductDTOs();
    }

    // VALIDATION TEST
    @GetMapping("/validation-test")
    public Product validationTest() {

        Product product =
                new Product();

        product.setProductName("");

        product.setPrice(
                -100.0
        );

        product.setQuantity(
                -5
        );

        return productService
                .addProduct(product);
    }
}
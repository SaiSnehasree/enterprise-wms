package com.sneha.wms.controller;

import com.sneha.wms.entity.Product;
import com.sneha.wms.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // Add Product
    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return productService.addProduct(product);
    }

    // Get All Products
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // Get Product By Id
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    // Delete Product
    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return "Product deleted successfully!";
    }

    @GetMapping("/test")
    public String testApi() {
        return "WMS Product API Working!";
    }

    @GetMapping("/add-sample")
    public Product addSampleProduct() {

        Product product = new Product();

        product.setSku("SKU001");
        product.setProductName("Laptop");
        product.setDescription("Dell Gaming Laptop");
        product.setPrice(75000.0);
        product.setQuantity(10);

        return productService.addProduct(product);
    }

    @PutMapping("/{id}")
    public Product updateProduct(
            @PathVariable Long id,
            @RequestBody Product product) {

        return productService.updateProduct(id, product);
    }

    @GetMapping("/update-sample")
    public Product updateSampleProduct() {

        Product updatedProduct = new Product();

        updatedProduct.setSku("SKU001");
        updatedProduct.setProductName("Dell Gaming Laptop Pro");
        updatedProduct.setDescription("Updated Gaming Laptop");
        updatedProduct.setPrice(90000.0);
        updatedProduct.setQuantity(20);

        return productService.updateProduct(
                1L, updatedProduct);
    }
}
package com.sneha.wms.service;

import com.sneha.wms.entity.Product;
import com.sneha.wms.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // Add Product
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    // Get All Products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Get Product By Id
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }
    public Product updateProduct(Long id, Product updatedProduct) {

        Product existingProduct =
                productRepository.findById(id).orElse(null);

        if (existingProduct != null) {

            existingProduct.setSku(updatedProduct.getSku());
            existingProduct.setProductName(
                    updatedProduct.getProductName());
            existingProduct.setDescription(
                    updatedProduct.getDescription());
            existingProduct.setPrice(
                    updatedProduct.getPrice());
            existingProduct.setQuantity(
                    updatedProduct.getQuantity());

            return productRepository.save(existingProduct);
        }

        return null;
    }

    // Delete Product
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
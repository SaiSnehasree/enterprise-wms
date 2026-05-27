package com.sneha.wms.service;

import com.sneha.wms.entity.Product;
import com.sneha.wms.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sneha.wms.exception.ResourceNotFoundException;
import java.util.ArrayList;
import com.sneha.wms.dto.ProductDTO;

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
    public List<ProductDTO> getAllProductDTOs() {

        List<Product> products =
                productRepository.findAll();

        List<ProductDTO> productDTOList =
                new ArrayList<>();

        for (Product product : products) {

            ProductDTO dto =
                    new ProductDTO();

            dto.setId(product.getId());
            dto.setProductName(
                    product.getProductName());

            dto.setPrice(
                    product.getPrice());

            productDTOList.add(dto);
        }

        return productDTOList;
    }

    // Get Product By Id
    public Product getProductById(Long id) {

        return productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product not found with id: "
                                        + id));
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
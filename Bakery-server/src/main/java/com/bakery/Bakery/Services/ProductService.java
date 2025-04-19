package com.bakery.Bakery.Services;

import com.bakery.Bakery.DTO.AddProduct;
import com.bakery.Bakery.DTO.InventoryResponse;
import com.bakery.Bakery.DTO.ProductResponse;
import com.bakery.Bakery.Entity.BakeryShop;
import com.bakery.Bakery.Entity.Inventory;
import com.bakery.Bakery.Entity.Product;
import com.bakery.Bakery.Repositories.BakeryShopRepository;
import com.bakery.Bakery.Repositories.InventoryRepository;
import com.bakery.Bakery.Repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private BakeryShopRepository bakeryShopRepository;

    public List<ProductResponse> getAllProducts() {
        List<Product> products = productRepository.findAll();

        return products.stream().map(product -> {
            Inventory inventory = inventoryRepository.findByProductProductId(product.getProductId());
            boolean isAvailable = inventory != null && inventory.getStockQuantity() > 0;

            return new ProductResponse(
                    product.getProductId(),
                    product.getProductName(),
                    product.getDescription(),
                    product.getPrice(),
                    product.getCategory(),
                    product.getImageUrl(),
                    product.getCreatedAt(),
                    product.getBakery(),
                    isAvailable
            );
        }).collect(Collectors.toList());
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public Product addProduct(AddProduct productDTO) {
        // Fetch the BakeryShop entity using the bakeryId from the DTO
        BakeryShop bakeryShop = bakeryShopRepository.findById(productDTO.getBakeryId())
                .orElseThrow(() -> new RuntimeException("Bakery not found"));

        // Create a new product entity from the DTO
        Product product = new Product();
        product.setProductName(productDTO.getProductName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setCategory(productDTO.getCategory());
        product.setImageUrl(productDTO.getImageUrl());
        product.setBakery(bakeryShop);
        product.setCreatedAt(LocalDateTime.now());

        // Save the product to the database
        product = productRepository.save(product);

        // Create a new inventory record for the product
        Inventory inventory = new Inventory();
        inventory.setProduct(product);
        inventory.setStockQuantity(productDTO.getStockQuantity());
        inventory.setReorderLevel(productDTO.getReorderLevel());
        inventory.setLastUpdated(LocalDateTime.now());

        // Save the inventory record to the database
        inventoryRepository.save(inventory);

        return product;
    }

}

package com.bakery.Bakery.DTO;

import com.bakery.Bakery.Entity.BakeryShop;
import java.time.LocalDateTime;

public class ProductResponse {
    private Long productId;
    private String productName;
    private String description;
    private Double price;
    private String category;
    private String imageUrl;
    private LocalDateTime createdAt;
    private BakeryShop bakery;
    private boolean isAvailable;

    public ProductResponse(Long productId, String productName, String description,
                           Double price, String category, String imageUrl,
                           LocalDateTime createdAt, BakeryShop bakery, boolean isAvailable) {
        this.productId = productId;
        this.productName = productName;
        this.description = description;
        this.price = price;
        this.category = category;
        this.imageUrl = imageUrl;
        this.createdAt = createdAt;
        this.bakery = bakery;
        this.isAvailable = isAvailable;
    }

    // Getters and Setters

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public BakeryShop getBakery() {
        return bakery;
    }

    public void setBakery(BakeryShop bakery) {
        this.bakery = bakery;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }
}


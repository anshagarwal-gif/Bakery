package com.bakery.Bakery.DTO;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AddProduct {

    private String productName;

    private String description;

    private Double price;

    private String category;

    private String imageUrl;

    private Long bakeryId;

    private Integer stockQuantity;

    private Integer reorderLevel;

    // Getters and setters
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

    public Long getBakeryId() {
        return bakeryId;
    }

    public void setBakeryId(Long bakeryId) {
        this.bakeryId = bakeryId;
    }

    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public Integer getReorderLevel() {
        return reorderLevel;
    }

    public void setReorderLevel(Integer reorderLevel) {
        this.reorderLevel = reorderLevel;
    }

}

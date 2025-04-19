package com.bakery.Bakery.DTO;


import com.bakery.Bakery.Entity.Product;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class InventoryResponse {
    private Product product;
    private Integer stockQuantity;
    private Integer reorderLevel;
    private LocalDateTime lastUpdated;
    private String status;

    public InventoryResponse(Product product, Integer stockQuantity, Integer reorderLevel, LocalDateTime lastUpdated, String status) {
        this.product = product;
        this.stockQuantity = stockQuantity;
        this.reorderLevel = reorderLevel;
        this.lastUpdated = lastUpdated;
        this.status = status;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
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

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
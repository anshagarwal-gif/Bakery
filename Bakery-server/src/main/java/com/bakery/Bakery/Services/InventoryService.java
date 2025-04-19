package com.bakery.Bakery.Services;

import com.bakery.Bakery.DTO.InventoryResponse;
import com.bakery.Bakery.Entity.Inventory;
import com.bakery.Bakery.Repositories.InventoryRepository;
import com.bakery.Bakery.Repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<InventoryResponse> getInventoryStatus() {
        List<Inventory> inventories = inventoryRepository.findAll();

        return inventories.stream().map(inventory -> {
            String status;
            if (inventory.getStockQuantity() == 0) {
                status = "Out of Stock";
            } else if (inventory.getStockQuantity() <= inventory.getReorderLevel()) {
                status = "Low Stock";
            } else {
                status = "In Stock";
            }

            return new InventoryResponse(
                    inventory.getProduct(),
                    inventory.getStockQuantity(),
                    inventory.getReorderLevel(),
                    inventory.getLastUpdated(),
                    status
            );
        }).collect(Collectors.toList());
    }

    public void restockProduct(Long productId, int quantityToAdd) {
        Inventory inventory = inventoryRepository.findByProductProductId(productId);
        if (inventory != null) {
            inventory.setStockQuantity(inventory.getStockQuantity() + quantityToAdd);
            inventory.setLastUpdated(LocalDateTime.now());
            inventoryRepository.save(inventory);
        }
    }

    public void deleteInventoryByProductId(Long productId) {
        Inventory inventory = inventoryRepository.findByProductProductId(productId);
        if (inventory != null) {
            inventoryRepository.delete(inventory);
        }
    }

}

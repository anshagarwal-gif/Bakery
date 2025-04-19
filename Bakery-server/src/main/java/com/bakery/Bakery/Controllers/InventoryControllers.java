package com.bakery.Bakery.Controllers;

import com.bakery.Bakery.DTO.InventoryResponse;
import com.bakery.Bakery.Services.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
public class InventoryControllers {

    @Autowired
    private InventoryService inventoryService;

    @GetMapping
    public List<InventoryResponse> getInventoryStatus() {
        return inventoryService.getInventoryStatus();
    }

    @PutMapping("/restock/{productId}")
    public String restockProduct(@PathVariable Long productId, @RequestParam int quantity) {
        inventoryService.restockProduct(productId, quantity);
        return "Product restocked successfully.";
    }

}

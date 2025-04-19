package com.bakery.Bakery.Controllers;

import com.bakery.Bakery.DTO.AddProduct;
import com.bakery.Bakery.DTO.ProductResponse;
import com.bakery.Bakery.Entity.Product;
import com.bakery.Bakery.Services.InventoryService;
import com.bakery.Bakery.Services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductControllers {

    @Autowired
    private ProductService productService;

    @Autowired
    private InventoryService inventoryService;

    @GetMapping
    public List<ProductResponse> getAllProducts() {
        return productService.getAllProducts();
    }

    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable Long id) {
        inventoryService.deleteInventoryByProductId(id);
        productService.deleteProduct(id);
        return "Product and associated inventory deleted successfully.";
    }

    @PostMapping
    public ResponseEntity<Product> addProduct(@RequestBody AddProduct productDTO) {
        Product product = productService.addProduct(productDTO);
        return ResponseEntity.ok(product);
    }

}

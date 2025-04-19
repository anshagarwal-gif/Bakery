package com.bakery.Bakery.Repositories;

import com.bakery.Bakery.Entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    Inventory findByProductProductId(Long productId);

}

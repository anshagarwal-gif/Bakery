package com.bakery.Bakery.Repositories;

import com.bakery.Bakery.Entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByBakery_BakeryId(Long bakeryId);

}

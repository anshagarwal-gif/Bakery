package com.bakery.Bakery.Repositories;

import com.bakery.Bakery.Entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

}

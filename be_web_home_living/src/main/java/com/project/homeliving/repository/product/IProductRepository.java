package com.project.homeliving.repository.product;

import com.project.homeliving.entity.product.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IProductRepository extends JpaRepository<Product, Long> {
    @Query("""
    select e from Product e
        where e.isDelete = false
            and (:keyword is null or e.name ilike %:keyword%)
            and (:categoryId is null or e.category.id = :categoryId)
            and e.isDelete <> true
            and e.category.isDelete <> true
            order by e.createDate desc
    """)
    Page<Product> search(@Param("keyword") String keyword,
                           @Param("categoryId") Long categoryId,
                           Pageable pageable);

    @Query("""
    select p from Product p
    left join OrderDetail od on od.product.id = p.id
    left join od.order o on o.paymentStatus in ('PAID', 'COMPLETED')
    where p.isDelete = false
        and (o.isDelete = false or o.isDelete is null)
    group by p.id, p.name, p.price, p.image, p.supplier
    order by sum(case when od.quantity is null then 0 else od.quantity end) desc
    """)
    List<Product> findTop5BestSellers(Pageable pageable);

    @Query("""
    select p from Product p
    where p.isDelete = false
    order by p.price asc
    """)
    List<Product> findTop5Cheapest(Pageable pageable);

    @Query("""
    select p from Product p
    where p.isDelete = false
    order by p.price desc
    """)
    List<Product> findTop5HighestRated(Pageable pageable);

    // Validation methods for delete operations
    @Query("SELECT COUNT(od) > 0 FROM OrderDetail od WHERE od.product.id = :productId AND od.isDelete = false")
    boolean hasActiveOrderDetails(@Param("productId") Long productId);

    @Query("SELECT COUNT(f) > 0 FROM Feedback f WHERE f.product.id = :productId AND f.isDelete = false")
    boolean hasActiveFeedbacks(@Param("productId") Long productId);
}

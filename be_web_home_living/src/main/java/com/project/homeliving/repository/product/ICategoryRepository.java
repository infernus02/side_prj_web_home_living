package com.project.homeliving.repository.product;

import com.project.homeliving.entity.product.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ICategoryRepository extends JpaRepository<Category, Long> {
    @Query("""
    select ct from Category ct
        where ct.isDelete = false
            and (:keyword is null or ct.name ilike %:keyword%)
            and ( :type is null or :type = '' or ct.categoryType = :type)
            order by ct.createDate desc 
    """)
    Page<Category> search(@Param("keyword") String keyword,
                          @Param("type") String type,
                          Pageable pageable);

    boolean existsByNameAndCategoryType(String name, String categoryType);


    @Query("SELECT COUNT(p) > 0 FROM Product p WHERE p.category.id = :categoryId AND p.isDelete = false")
    boolean hasActiveProducts(@Param("categoryId") Long categoryId);
}

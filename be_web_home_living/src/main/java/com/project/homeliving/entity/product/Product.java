package com.project.homeliving.entity.product;

import com.project.homeliving.entity.BaseEntity;
import com.project.homeliving.entity.feedback.Feedback;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.Formula;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "tbl_product")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Product extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String image;
    String name;
    Double price;
    Long quantity;
    String supplier;

    @ManyToOne
    @JoinColumn(name = "category_id")
    Category category;

    // Feedback relationship
    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    List<Feedback> feedbacks;

    // Tính rating trung bình từ feedback của Customer (không tính Staff reply)
    @Formula("""
        (SELECT COALESCE(AVG(f.rating), 0.0)
         FROM tbl_feedback f
         WHERE f.product_id = id
           AND f.feedback_type = 'CUSTOMER'
           AND f.rating IS NOT NULL
           AND f.is_delete = false)
    """)
    Double averageRating;

    // Removed: @OneToMany(mappedBy = "product") List<Order> orders;
    // Now Product connects to Order through OrderDetail

    public Product(Long id){
        this.id = id;
    }
}

package com.project.homeliving.entity.feedback;

import com.project.homeliving.entity.BaseEntity;
import com.project.homeliving.entity.product.Product;
import com.project.homeliving.entity.user.Customer;
import com.project.homeliving.entity.user.Staff;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "tbl_feedback")
public class Feedback extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    Double rating;          // Chỉ Customer mới có rating, Staff reply không có
    String comment;
    String feedbackType;    // "CUSTOMER" hoặc "STAFF_REPLY"

    // Customer feedback (chỉ 1 lần)
    @ManyToOne
    @JoinColumn(name = "customer_id")
    Customer customer;

    // Staff reply (có thể nhiều lần)
    @ManyToOne
    @JoinColumn(name = "staff_id")
    Staff staff;

    // Feedback gốc mà Staff đang reply (null nếu là feedback gốc của Customer)
    @ManyToOne
    @JoinColumn(name = "parent_feedback_id")
    Feedback parentFeedback;

    // Danh sách replies từ Staff
    @OneToMany(mappedBy = "parentFeedback", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    List<Feedback> replies;

    @ManyToOne
    @JoinColumn(name = "product_id")
    Product product;
}

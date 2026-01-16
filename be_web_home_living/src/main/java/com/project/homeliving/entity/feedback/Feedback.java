package com.project.homeliving.entity.feedback;

import com.project.homeliving.entity.BaseEntity;
import com.project.homeliving.entity.product.Product;
import com.project.homeliving.entity.user.User;
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

    Double rating;          // Chỉ User mới có rating, reply không có
    String comment;
    String feedbackType;    // "CUSTOMER" hoặc ""

    // User feedback (chỉ 1 lần)
    @ManyToOne
    @JoinColumn(name = "customer_id")
    User user;

    // Feedback gốc mà  đang reply (null nếu là feedback gốc của User)
    @ManyToOne
    @JoinColumn(name = "parent_feedback_id")
    Feedback parentFeedback;

    // Danh sách replies từ
    @OneToMany(mappedBy = "parentFeedback", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    List<Feedback> replies;

    @ManyToOne
    @JoinColumn(name = "product_id")
    Product product;
}

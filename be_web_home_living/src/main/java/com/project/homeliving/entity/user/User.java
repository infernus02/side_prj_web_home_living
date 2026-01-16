package com.project.homeliving.entity.user;

import com.project.homeliving.entity.BaseEntity;
import com.project.homeliving.entity.feedback.Feedback;
import com.project.homeliving.entity.order.Order;
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
@Table(name = "tbl_user")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String fullName;
    String phoneNumber;
    String email;

    // Tổng chi tiêu (Order đã thanh toán)
//    @Formula("""
//        (SELECT COALESCE(SUM(o.total_amount), 0.0)
//         FROM tbl_order o
//         WHERE o.customer_id = id
//           AND o.payment_status = 'PAID'
//           AND o.is_delete = false)
//    """)
    Double totalSpending;

    String avatar;

    @OneToOne
    @JoinColumn(name = "account_id")
    Account account;

    @OneToMany(mappedBy = "user")
    List<Feedback> feedbacks;

    @OneToMany(mappedBy = "user")
    List<Order> orders;

    public User(Long id){
        this.id = id;
    }
}

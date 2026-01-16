package com.project.homeliving.entity.order;

import com.project.homeliving.entity.BaseEntity;
import com.project.homeliving.entity.user.Customer;
import com.project.homeliving.entity.user.Staff;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "tbl_order")
public class Order extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String type;            // "PRODUCT" hoặc "TREATMENT"
    Double totalAmount;     // Tổng tiền (orderDetails + treatment)
    Double discount;
    String paymentType;
    String paymentStatus;
    LocalDateTime orderTime;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    Customer customer;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    Staff staff;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    List<OrderDetail> orderDetails;
}

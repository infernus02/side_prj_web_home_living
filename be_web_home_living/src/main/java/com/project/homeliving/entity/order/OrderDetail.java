package com.project.homeliving.entity.order;

import com.project.homeliving.entity.BaseEntity;
import com.project.homeliving.entity.product.Product;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "tbl_order_detail")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderDetail extends BaseEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    Order order;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    Product product;
    
    @Column(name = "quantity")
    Integer quantity;
    
    @Column(name = "unit_price")
    Double unitPrice;
    
    @Column(name = "total_price")
    Double totalPrice;
    
//    @PrePersist
//    @PreUpdate
//    private void calculateTotalPrice() {
//        if (quantity != null && unitPrice != null) {
//            this.totalPrice = quantity * unitPrice;
//        }
//    }
}

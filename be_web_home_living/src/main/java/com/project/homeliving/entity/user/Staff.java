package com.project.homeliving.entity.user;

import com.project.homeliving.entity.BaseEntity;
import com.project.homeliving.entity.order.Order;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "tbl_staff")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Staff extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String avatar;
    String fullName;
    String phoneNumber;
    String email;
    String major;

    Boolean status;

    @OneToOne
    @JoinColumn(name = "account_id")
    Account account;

    @OneToMany(mappedBy = "staff")
    List<Order> orders;

    public Staff(Long id){
        this.id = id;
    }
}

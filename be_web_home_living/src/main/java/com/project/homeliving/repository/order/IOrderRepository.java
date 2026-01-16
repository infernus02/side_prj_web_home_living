package com.project.homeliving.repository.order;

import com.project.homeliving.entity.order.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IOrderRepository extends JpaRepository<Order, Long> {
    @Query("""
    select e from Order e
        where
             (
                  :keyword is null
                  or e.customer.fullName ilike %:keyword%
                  or e.staff.fullName ilike %:keyword%
                  or e.customer.phoneNumber ilike %:keyword%
            )
            and (:paymentType is null or e.paymentType = :paymentType)
            and (:status is null or e.paymentStatus = :status)
            and e.isDelete <> true
            order by e.createDate desc
    """)
    Page<Order> search(@Param("keyword") String keyword,
                       @Param("paymentType") String paymentType,
                       @Param("status") String status,
                       Pageable pageable);

    @Query("""
    select e from Order e
        where
             (
                  :keyword is null
                  or e.customer.fullName ilike %:keyword%
                  or e.staff.fullName ilike %:keyword%
                  or e.customer.phoneNumber ilike %:keyword%
            )
            and e.type = :orderType
            and (:paymentType is null or e.paymentType = :paymentType)
            and (:customerId is null or e.customer.id = :customerId)
            and e.isDelete <> true
            order by e.createDate desc
    """)
    Page<Order> searchByType(@Param("keyword") String keyword,
                            @Param("orderType") String orderType,
                            @Param("paymentType") String paymentType,
                            @Param("customerId") Long customerId,
                            Pageable pageable);

}

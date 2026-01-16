package com.project.homeliving.repository.order;

import com.project.homeliving.entity.order.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IOrderDetailRepository extends JpaRepository<OrderDetail, Long> {

    @Modifying
    @Query("DELETE FROM OrderDetail od WHERE od.order.id = :orderId")
    void deleteByOrderId(@Param("orderId") Long orderId);
    
    @Query("""
    select od from OrderDetail od
    where od.order.id = :orderId
        and od.isDelete = false
    order by od.createDate desc
    """)
    List<OrderDetail> findByOrderId(@Param("orderId") Long orderId);
}

package com.project.homeliving.repository.feedback;

import com.project.homeliving.entity.feedback.Feedback;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IFeedbackRepository extends JpaRepository<Feedback, Long> {


    @Query("""
    select f from Feedback f
    where f.customer.id = :customerId
        and f.product.id = :productId
        and f.feedbackType = 'CUSTOMER'
        and f.parentFeedback is null 
        and f.isDelete = false
    """)
    List<Feedback> findCustomerFeedbackForProduct(@Param("customerId") Long customerId,
                                                     @Param("productId") Long productId);

    // Lấy tất cả replies của một feedback
    @Query("""
    select f from Feedback f
    where f.parentFeedback.id = :parentFeedbackId
        and f.isDelete = false
    order by f.createDate asc
    """)
    List<Feedback> findRepliesByParentFeedback(@Param("parentFeedbackId") Long parentFeedbackId);

    // Validation methods for delete operations
    @Query("SELECT COUNT(f) > 0 FROM Feedback f WHERE f.parentFeedback.id = :feedbackId AND f.isDelete = false")
    boolean hasActiveReplies(@Param("feedbackId") Long feedbackId);


}

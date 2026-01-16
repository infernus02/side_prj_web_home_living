package com.project.homeliving.repository.user;

import com.project.homeliving.entity.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User, Long> {

    User findByAccountId(Long accountId);

    // Validation methods for delete operations
    @Query("SELECT COUNT(o) > 0 FROM Order o WHERE o.user.id = :customerId AND o.isDelete = false")
    boolean hasActiveOrders(@Param("customerId") Long customerId);

    @Query("SELECT COUNT(f) > 0 FROM Feedback f WHERE f.user.id = :customerId AND f.isDelete = false")
    boolean hasActiveFeedbacks(@Param("customerId") Long customerId);
}

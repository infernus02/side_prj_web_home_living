package com.project.homeliving.repository.user;

import com.project.homeliving.entity.user.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ICustomerRepository extends JpaRepository<Customer, Long> {

    @Query("""
    select cs from Customer cs 
        where ((:keysearch is null or :keysearch = '')
            or (cs.account.username ilike %:keysearch% )
            or (cs.fullName ilike %:keysearch% )
            or (cs.email ilike %:keysearch% )
            )
        and cs.isDelete = false 
        and cs.account.isDelete = false 
        order by cs.updateDate
    """)
    Page<Customer> search(@Param("keysearch") String keySearch,
                          Pageable pageable);

    @Query("""
    select count (*)
    from Customer cs 
    where cs.isDelete = false 
    and cs.account.isDelete = false 
    """)
    Long countActive();

    Customer findByAccountId(Long accountId);

    // Validation methods for delete operations
    @Query("SELECT COUNT(o) > 0 FROM Order o WHERE o.customer.id = :customerId AND o.isDelete = false")
    boolean hasActiveOrders(@Param("customerId") Long customerId);

    @Query("SELECT COUNT(f) > 0 FROM Feedback f WHERE f.customer.id = :customerId AND f.isDelete = false")
    boolean hasActiveFeedbacks(@Param("customerId") Long customerId);
}

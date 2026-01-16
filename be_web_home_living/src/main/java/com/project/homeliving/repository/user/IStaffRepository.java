package com.project.homeliving.repository.user;

import com.project.homeliving.entity.user.Staff;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IStaffRepository extends JpaRepository<Staff, Long> {
    @Query("""
    select e from Staff e
        left join e.account a 
        where e.isDelete = false
            and (:keyword is null or e.fullName ilike %:keyword%) 
            and (:major is null or :major = '' or e.major ilike %:major%)    
            and (:status is null or e.status = :status)   
            and e.isDelete = false 
            and e.account.isDelete = false 
            order by e.createDate desc 
    """)
    Page<Staff> search(@Param("keyword") String keyword,
                         @Param("major") String major,
                         @Param("status") Boolean status,
                         Pageable pageable);

    @Query("""
    select count (*) from Staff e 
    where e.isDelete = false 
    and e.account.isDelete = false 
    """)
    Long countAllActive();

    Staff findByAccountId(Long accountId);

    // Validation methods for delete operations
    @Query("SELECT COUNT(o) > 0 FROM Order o WHERE o.staff.id = :staffId AND o.isDelete = false")
    boolean hasActiveOrders(@Param("staffId") Long staffId);
}

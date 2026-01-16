package com.project.homeliving.repository.user;

import com.project.homeliving.entity.user.Account;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IAccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByUsername(String username);

    boolean existsByUsername(String username);

    @Query("""
select us from Account us 
where us.isDelete = false 
and (:keyword is null or us.username = :keyword) 
order by us.createDate desc  
""")
    Page<Account> findAll(@Param("keyword") String keyword,
                          Pageable pageable);
}

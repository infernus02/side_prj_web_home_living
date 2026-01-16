package com.project.homeliving.service.interfaces.user;

import com.project.homeliving.configuration.security.UserDetailsImpl;
import com.project.homeliving.entity.user.Account;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface IAccountService extends UserDetailsService {
    long count();
    UserDetailsImpl getUserInContext();

    boolean exitsByUsername(String username);
    Account findByUserName(String username);
    Account findById(Long id);
    void delete(String username);
}

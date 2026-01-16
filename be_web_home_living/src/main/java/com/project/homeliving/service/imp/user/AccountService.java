package com.project.homeliving.service.imp.user;

import com.project.homeliving.configuration.security.UserDetailsImpl;
import com.project.homeliving.entity.user.Account;
import com.project.homeliving.exception.AppException;
import com.project.homeliving.exception.ErrorCode;
import com.project.homeliving.mapper.AccountMapper;
import com.project.homeliving.repository.user.IAccountRepository;
import com.project.homeliving.service.interfaces.user.IAccountService;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@Transactional
@FieldDefaults(level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
public class AccountService implements IAccountService {
    private final IAccountRepository accountRepository;
    private final AccountMapper accountMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = accountRepository.findByUsername(username).orElseThrow(
                () -> new AppException(ErrorCode.USER_NOT_FOUND)
        );

        return new UserDetailsImpl(account);
    }

    @Override
    public long count() {
        return accountRepository.count();
    }

    @Override
    public UserDetailsImpl getUserInContext() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            if (userDetails instanceof UserDetailsImpl)
                return (UserDetailsImpl) userDetails;
        } catch (Exception e) {
            return null;
        }
        return null;
    }

    @Override
    public boolean exitsByUsername(String username) {
        return accountRepository.existsByUsername(username);
    }

    @Override
    public Account findByUserName(String username) {
        return accountRepository.findByUsername(username).orElseThrow(
                () -> new AppException(ErrorCode.USER_NOT_FOUND)
        );
    }

    @Override
    public Account findById(Long id) {
        return accountRepository.findById(id).orElseThrow(
                () -> new AppException(ErrorCode.USER_NOT_FOUND)
        );
    }

    @Override
    public void delete(String username) {
        Account account = this.findByUserName(username);
        account.setIsDelete(true);
        accountRepository.save(account);
    }

}

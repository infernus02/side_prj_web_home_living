package com.project.homeliving.service.imp.user;

import com.project.homeliving.configuration.security.UserDetailsImpl;
import com.project.homeliving.configuration.security.jwtConfig.JwtProvider;
import com.project.homeliving.dto.authen.request.ChangePassRequest;
import com.project.homeliving.dto.authen.request.LoginRequest;
import com.project.homeliving.dto.authen.request.RegisterRequest;
import com.project.homeliving.dto.authen.response.LoginResponse;
import com.project.homeliving.dto.user.response.AccountResponse;
import com.project.homeliving.dto.user.response.UserResponse;
import com.project.homeliving.entity.user.Account;
import com.project.homeliving.entity.user.User;
import com.project.homeliving.entity.user.Role;
import com.project.homeliving.enums.RoleEnum;
import com.project.homeliving.exception.AppException;
import com.project.homeliving.exception.ErrorCode;
import com.project.homeliving.mapper.AccountMapper;
import com.project.homeliving.mapper.UserMapper;
import com.project.homeliving.repository.user.IAccountRepository;
import com.project.homeliving.repository.user.IUserRepository;
import com.project.homeliving.service.interfaces.user.IAuthenService;
import com.project.homeliving.service.interfaces.user.IAccountService;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@Transactional
@FieldDefaults(level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
public class AuthenService implements IAuthenService {
    private final IAccountRepository accountRepository;
    private final IUserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;
    private final IAccountService userService;
    private final IUserRepository customerRepository;

    private final  AccountMapper accountMapper;
    private final UserMapper userMapper;

    @Override
    public LoginResponse register(RegisterRequest request, RoleEnum role) {
        if(userService.exitsByUsername(request.getAccount().getUsername()))
            throw new AppException(ErrorCode.USERNAME_WAS_REGISTER);

        if (role == null)
            role = RoleEnum.CUSTOMER;

        Account account = Account.builder()
                .username(request.getAccount().getUsername())
                .password(passwordEncoder.encode(request.getAccount().getPassword()))
                .role(new Role(role.name()))
                .build();

        User user = userMapper.toEntity(request.getUser());
        user.setAccount(account);

        accountRepository.save(account);
        userRepository.save(user);
        return LoginResponse.builder()
                .username(request.getAccount().getUsername())
                .role(role.name())
                .build();
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate
                (new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        String jwt = jwtProvider.generateTokenByUsername(request.getUsername());

        return LoginResponse.builder()
                .token(jwt)
                .role(userDetails.getRoleName())
                .username(userDetails.getUsername())
                .build();
    }

    @Override
    public Account getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        if (username == null)
            throw new AppException(ErrorCode.UNAUTHEN);

        return accountRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
    }


    @Override
    public AccountResponse changePassword(ChangePassRequest request) {
        if(request.getNewPass() == null || request.getNewPass().isEmpty())
            throw new AppException(ErrorCode.PASSWORD_NOT_NULL);

        Account account = this.getCurrentUser();
        if(!passwordEncoder.matches(request.getOldPass(), account.getPassword()))
            throw new AppException(ErrorCode.PASSWORD_NOT_MATCH);

        account.setPassword(passwordEncoder.encode(request.getNewPass()));

        return accountMapper.toResponse(accountRepository.save(account));
    }

    @Override
    public UserResponse getUserInContext() {
        Account account = this.getCurrentUser();
        User user = customerRepository.findByAccountId(account.getId());
        return userMapper.toResponse(user);
    }
}

package com.project.homeliving.mapper;

import com.project.homeliving.dto.user.request.AccountRequest;
import com.project.homeliving.dto.user.response.AccountResponse;
import com.project.homeliving.entity.user.Account;
import com.project.homeliving.entity.user.Role;
import com.project.homeliving.exception.AppException;
import com.project.homeliving.exception.ErrorCode;
import com.project.homeliving.service.interfaces.user.IRoleService;
import com.project.homeliving.util.ConstUtils;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountMapper {
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    IRoleService roleService;

    public Account toEntity(AccountRequest request){
        if(request.getRole() == null)
            throw new AppException(ErrorCode.ROLE_NOT_NULL);
        Role role = roleService.findByName(request.getRole());

        return Account.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .build();
    }

    public AccountResponse toResponse(Account entity){
        String avatarTmp = ConstUtils.DEFAULT_AVATAR_IMAGE;

        return AccountResponse.builder()
                .id(entity.getId())
                .username(entity.getUsername())
                .role(entity.getRole().getName())
                .build();
    }
}

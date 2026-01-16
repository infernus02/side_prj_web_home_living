package com.project.homeliving.mapper;

import com.project.homeliving.dto.user.response.AccountResponse;
import com.project.homeliving.entity.user.Account;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Component;

@Component
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountMapper {
    public AccountResponse toResponse(Account entity){

        return AccountResponse.builder()
                .id(entity.getId())
                .username(entity.getUsername())
                .role(entity.getRole().getName())
                .build();
    }
}

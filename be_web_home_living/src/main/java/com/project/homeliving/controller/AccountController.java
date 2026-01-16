package com.project.homeliving.controller;

import com.project.homeliving.entity.user.Account;
import com.project.homeliving.enums.RoleEnum;
import com.project.homeliving.exception.ApiResponse;
import com.project.homeliving.service.interfaces.user.IAccountService;
import com.project.homeliving.service.interfaces.user.IAuthenService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE)
@RequestMapping("/accounts")
@RequiredArgsConstructor
public class AccountController {
    private final IAccountService userService;
    private final IAuthenService authenService;

    @GetMapping("/info")
    ApiResponse<Object> getInfo(){
        Account account = authenService.getCurrentUser();
        Object object = null;

        if (RoleEnum.CUSTOMER.name().equalsIgnoreCase(account.getRole().getName())){
            object = authenService.getCustomerInContext();
        }else
            object = authenService.getStafInContext();

        return ApiResponse.builder()
                .data(object)
                .build();
    }

    @DeleteMapping("/{username}")
    ApiResponse<Void> delete(@PathVariable String username){
        userService.delete(username);

        return ApiResponse.<Void>builder()
                .build();
    }
}

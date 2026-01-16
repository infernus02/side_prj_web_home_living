package com.project.homeliving.controller;

import com.project.homeliving.dto.authen.request.ChangePassRequest;
import com.project.homeliving.dto.authen.request.LoginRequest;
import com.project.homeliving.dto.authen.request.RegisterRequest;
import com.project.homeliving.dto.authen.response.LoginResponse;
import com.project.homeliving.dto.user.response.AccountResponse;
import com.project.homeliving.enums.RoleEnum;
import com.project.homeliving.exception.ApiResponse;
import com.project.homeliving.service.interfaces.user.IAuthenService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE)
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    IAuthenService authenService;

    @PostMapping("/login")
    ApiResponse<LoginResponse> login(@RequestBody LoginRequest request){
        return ApiResponse.<LoginResponse>builder()
                .data(authenService.login(request))
                .build();
    }

    @PostMapping("/register")
    ApiResponse<LoginResponse> register(@RequestBody RegisterRequest request){
        return ApiResponse.<LoginResponse>builder()
                .data(authenService.register(request, RoleEnum.CUSTOMER))
                .build();
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/change-password")
    ApiResponse<AccountResponse> changePass(@RequestBody ChangePassRequest request){
        return ApiResponse.<AccountResponse>builder()
                .data(authenService.changePassword(request))
                .build();
    }

}

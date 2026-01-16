package com.project.homeliving.controller;

import com.project.homeliving.dto.user.request.UserRequest;
import com.project.homeliving.dto.user.request.CustomerSearchRequest;
import com.project.homeliving.dto.user.request.CustomerUpdateRequest;
import com.project.homeliving.exception.ApiResponse;
import com.project.homeliving.service.interfaces.user.IAuthenService;
import com.project.homeliving.service.interfaces.user.IUserService;
import com.project.homeliving.util.StrUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Tag(name = "user controller")
public class UserController {
    private final IUserService userService;
    private final IAuthenService authenService;

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/info")
    ApiResponse<?>getInfo(){
        return ApiResponse.<Object>builder()
                .data(authenService.getUserInContext())
                .build();
    }

//    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @Operation(summary = "search")
    @GetMapping("")
    ApiResponse<?> search(@RequestParam(name = "keyword", required = false)String keyword,
                          @RequestParam(name = "page", defaultValue = "1")Integer page,
                          @RequestParam(name = "limit", defaultValue = "10")Integer limit){
        CustomerSearchRequest searchRequest = CustomerSearchRequest.builder()
                .keyword(StrUtils.toString(keyword))
                .page(page)
                .limit(limit)
                .build();
        return ApiResponse.<Object>builder()
                .data(userService.search(searchRequest))
                .build();
    }

    @Operation(summary = "find-details")
    @GetMapping("/{id}")
    ApiResponse<Object> details(@PathVariable Long id){
        return ApiResponse.<Object>builder()
                .data(userService.detail(id))
                .build();
    }

    @Operation(summary = "create")
    @PostMapping("")
    ApiResponse<?> create(@Valid @RequestBody UserRequest request){
        return ApiResponse.<Object>builder()
                .data(userService.create(request))
                .build();
    }

    @Operation(summary = "update")
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ApiResponse<?>update(@PathVariable Long id, @ModelAttribute CustomerUpdateRequest request){
        return ApiResponse.<Object>builder()
                .data(userService.updateProfile(id, request))
                .build();
    }

    @Operation(summary = "update")
    @PutMapping(value = "/myinfo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ApiResponse<?>update( @ModelAttribute CustomerUpdateRequest request){
        return ApiResponse.<Object>builder()
                .data(userService.updateProfileInfo(request))
                .build();
    }

    @Operation(summary = "delete")
    @DeleteMapping(value = "/{id}")
    ApiResponse<?>delete(@PathVariable Long id){
        userService.delete(id);
        return ApiResponse.<String>builder()
                .data("delete ok")
                .build();
    }
}

package com.project.homeliving.controller;

import com.project.homeliving.dto.user.request.CustomerRequest;
import com.project.homeliving.dto.user.request.CustomerSearchRequest;
import com.project.homeliving.dto.user.request.CustomerUpdateRequest;
import com.project.homeliving.exception.ApiResponse;
import com.project.homeliving.service.interfaces.user.IAuthenService;
import com.project.homeliving.service.interfaces.user.ICustomerService;
import com.project.homeliving.util.StrUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customers")
@RequiredArgsConstructor
@Tag(name = "customer controller")
public class CustomerController {
    private final ICustomerService customerService;
    private final IAuthenService authenService;

    @GetMapping("/myinfo")
    ApiResponse<?>getInfo(){
        return ApiResponse.<Object>builder()
                .data(authenService.getCustomerInContext())
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
                .data(customerService.search(searchRequest))
                .build();
    }

    @Operation(summary = "find-details")
    @GetMapping("/{id}")
    ApiResponse<Object> details(@PathVariable Long id){
        return ApiResponse.<Object>builder()
                .data(customerService.detail(id))
                .build();
    }

    @Operation(summary = "create")
    @PostMapping("")
    ApiResponse<?> create(@Valid @RequestBody CustomerRequest request){
        return ApiResponse.<Object>builder()
                .data(customerService.create(request))
                .build();
    }

    @Operation(summary = "update")
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ApiResponse<?>update(@PathVariable Long id, @ModelAttribute CustomerUpdateRequest request){
        return ApiResponse.<Object>builder()
                .data(customerService.updateProfile(id, request))
                .build();
    }

    @Operation(summary = "update")
    @PutMapping(value = "/myinfo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ApiResponse<?>update( @ModelAttribute CustomerUpdateRequest request){
        return ApiResponse.<Object>builder()
                .data(customerService.updateProfileInfo(request))
                .build();
    }

    @Operation(summary = "delete")
    @DeleteMapping(value = "/{id}")
    ApiResponse<?>delete(@PathVariable Long id){
        customerService.delete(id);
        return ApiResponse.<String>builder()
                .data("delete ok")
                .build();
    }
}

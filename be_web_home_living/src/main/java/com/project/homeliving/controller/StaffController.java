package com.project.homeliving.controller;

import com.project.homeliving.dto.user.request.*;
import com.project.homeliving.exception.ApiResponse;
import com.project.homeliving.service.interfaces.user.IAuthenService;
import com.project.homeliving.service.interfaces.user.IStaffService;
import com.project.homeliving.util.StrUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/staffs")
@RequiredArgsConstructor
@Tag(name = "staff controller")
public class StaffController {
    private final IStaffService staffService;
    private final IAuthenService authenService;

    @GetMapping("/myinfo")
    ApiResponse<?>getInfo(){
        return ApiResponse.<Object>builder()
                .data(authenService.getStafInContext())
                .build();
    }

    @Operation(summary = "search")
    @GetMapping("")
    ApiResponse<?> search(@RequestParam(name = "keyword", required = false)String keyword,
                          @RequestParam(name = "major", required = false) String major,
                          @RequestParam(name = "active", required = false) Boolean active,
                          @RequestParam(name = "page", defaultValue = "1")Integer page,
                          @RequestParam(name = "limit", defaultValue = "10")Integer limit){
        StaffSearch searchRequest = StaffSearch.builder()
                .keyword(StrUtils.toString(keyword))
                .major(StrUtils.toString(major))
                .status(active)
                .page(page)
                .limit(limit)
                .build();
        return ApiResponse.<Object>builder()
                .data(staffService.search(searchRequest))
                .build();
    }

    @Operation(summary = "find-details")
    @GetMapping("/{id}")
    ApiResponse<Object> details(@PathVariable Long id){
        return ApiResponse.<Object>builder()
                .data(staffService.detail(id))
                .build();
    }

    @Operation(summary = "create")
    @PostMapping(value = "",  consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ApiResponse<?> create(@Valid @ModelAttribute StaffRequest request){
        return ApiResponse.<Object>builder()
                .data(staffService.create(request))
                .build();
    }

    @Operation(summary = "update")
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ApiResponse<?>update(@PathVariable Long id, @ModelAttribute StaffRequest request){
        return ApiResponse.<Object>builder()
                .data(staffService.updateProfile(id, request))
                .build();
    }

    @Operation(summary = "change active")
    @PutMapping("/change-status/{id}")
    ApiResponse<?> updateStatus(@PathVariable Long id, @RequestBody StatusRequest request){
        staffService.changeStatus(id,request.getActive());
        return ApiResponse.<String>builder()
                .data("Thay đổi trạng thái ok")
                .build();

    }

    @Operation(summary = "delete")
    @DeleteMapping(value = "/{id}")
    ApiResponse<?>delete(@PathVariable Long id){
        staffService.delete(id);
        return ApiResponse.<String>builder()
                .data("delete ok")
                .build();
    }
}

package com.project.homeliving.controller;

import com.project.homeliving.dto.treatment.CategoryRequest;
import com.project.homeliving.dto.treatment.CategorySearch;
import com.project.homeliving.enums.CategoryTypeEnum;
import com.project.homeliving.exception.ApiResponse;
import com.project.homeliving.service.interfaces.treatment.ICategoryService;
import com.project.homeliving.util.StrUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
@Tag(name = "category controller")
public class CategoryController {
    private final ICategoryService categoryService;

    @Operation(summary = "search")
    @GetMapping("")
    ApiResponse<?> search(@RequestParam(name = "keyword", required = false)String keyword,
                          @RequestParam(name = "type", required = false) CategoryTypeEnum type,
                          @RequestParam(name = "page", defaultValue = "1")Integer page,
                          @RequestParam(name = "limit", defaultValue = "10")Integer limit){
        CategorySearch searchRequest = CategorySearch.builder()
                .keyword(StrUtils.toString(keyword))
                .categoryType(type != null ? type.toString(): null)
                .page(page)
                .limit(limit)
                .build();

        return ApiResponse.<Object>builder()
                .data(categoryService.search(searchRequest))
                .build();
    }

    @Operation(summary = "find-details")
    @GetMapping("/{id}")
    ApiResponse<Object> details(@PathVariable Long id){
        return ApiResponse.<Object>builder()
                .data(categoryService.detail(id))
                .build();
    }

    @Operation(summary = "create")
    @PostMapping("")
    ApiResponse<?> create(@Valid @RequestBody CategoryRequest request){
        return ApiResponse.<Object>builder()
                .data(categoryService.create(request))
                .build();
    }

    @Operation(summary = "update")
    @PutMapping(value = "/{id}")
    ApiResponse<?>update(@PathVariable Long id, @RequestBody CategoryRequest request){
        return ApiResponse.<Object>builder()
                .data(categoryService.update(id, request))
                .build();
    }

    @Operation(summary = "update")
    @DeleteMapping(value = "/{id}")
    ApiResponse<?>update(@PathVariable Long id){
        categoryService.delete(id);
        return ApiResponse.<String>builder()
                .data("delete ok")
                .build();
    }
}

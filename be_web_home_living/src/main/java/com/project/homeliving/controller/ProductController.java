package com.project.homeliving.controller;

import com.project.homeliving.dto.treatment.ProductRequest;
import com.project.homeliving.dto.treatment.ProductSearch;
import com.project.homeliving.exception.ApiResponse;
import com.project.homeliving.service.interfaces.treatment.IProductService;
import com.project.homeliving.util.StrUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@Tag(name = "product controller")
public class ProductController {
    private final IProductService productService;

    @Operation(summary = "search")
    @GetMapping("")
    ApiResponse<?> search(@RequestParam(name = "keyword", required = false)String keyword,
                          @RequestParam(name = "categoryId", required = false) Long categoryId,
                          @RequestParam(name = "page", defaultValue = "1")Integer page,
                          @RequestParam(name = "limit", defaultValue = "10")Integer limit){
        ProductSearch searchRequest = ProductSearch.builder()
                .keyword(StrUtils.toString(keyword))
                .categoryId(categoryId)
                .page(page)
                .limit(limit)
                .build();

        return ApiResponse.<Object>builder()
                .data(productService.search(searchRequest))
                .build();
    }

    @Operation(summary = "find-details")
    @GetMapping("/{id}")
    ApiResponse<Object> details(@PathVariable Long id){
        return ApiResponse.<Object>builder()
                .data(productService.detail(id))
                .build();
    }

    @Operation(summary = "create")
    @PostMapping(value = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ApiResponse<?> create( @ModelAttribute ProductRequest request){
        return ApiResponse.<Object>builder()
                .data(productService.create(request))
                .build();
    }

    @Operation(summary = "update")
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ApiResponse<?>update(@PathVariable Long id, @ModelAttribute ProductRequest request){
        return ApiResponse.<Object>builder()
                .data(productService.update(id, request))
                .build();
    }

    @Operation(summary = "update")
    @DeleteMapping(value = "/{id}")
    ApiResponse<?>update(@PathVariable Long id){
        productService.delete(id);
        return ApiResponse.<String>builder()
                .data("delete ok")
                .build();
    }
}

package com.project.homeliving.controller;

import com.project.homeliving.dto.order.ProductOrderRequest;
import com.project.homeliving.dto.order.OrderSearch;
import com.project.homeliving.exception.ApiResponse;
import com.project.homeliving.service.interfaces.order.IProductOrderService;
import com.project.homeliving.util.StrUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order/product")
@RequiredArgsConstructor
@Tag(name = "product order controller")
public class ProductOrderController {
    private final IProductOrderService productOrderService;

    @Operation(summary = "search product orders")
    @GetMapping("")
    ApiResponse<?> search(@RequestParam(name = "keyword", required = false)String keyword,
                          @RequestParam(name = "paymentType", required = false) String paymentType,
                          @RequestParam(name = "searchMine", defaultValue = "false") Boolean searchMine,
                          @RequestParam(name = "page", defaultValue = "1")Integer page,
                          @RequestParam(name = "limit", defaultValue = "10")Integer limit){
        OrderSearch searchRequest = OrderSearch.builder()
                .keyword(StrUtils.toString(keyword))
                .paymentType(StrUtils.toString(paymentType))
                .page(page)
                .limit(limit)
                .build();

        return ApiResponse.<Object>builder()
                .data(productOrderService.search(searchRequest, searchMine))
                .build();
    }

    @Operation(summary = "find product order details")
    @GetMapping("/{id}")
    ApiResponse<Object> details(@PathVariable Long id){
        return ApiResponse.<Object>builder()
                .data(productOrderService.detail(id))
                .build();
    }

    @Operation(summary = "create product order")
    @PostMapping("")
    ApiResponse<?> create(@RequestBody ProductOrderRequest request){
        return ApiResponse.<Object>builder()
                .data(productOrderService.create(request))
                .build();
    }

    @Operation(summary = "update product order")
    @PutMapping(value = "/{id}")
    ApiResponse<?> update(@PathVariable Long id, @RequestBody ProductOrderRequest request){
        return ApiResponse.<Object>builder()
                .data(productOrderService.update(id, request))
                .build();
    }

    @Operation(summary = "delete product order")
    @DeleteMapping(value = "/{id}")
    ApiResponse<?> delete(@PathVariable Long id){
        productOrderService.delete(id);
        return ApiResponse.<String>builder()
                .data("delete ok")
                .build();
    }
}

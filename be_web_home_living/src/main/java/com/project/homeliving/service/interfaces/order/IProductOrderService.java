package com.project.homeliving.service.interfaces.order;

import com.project.homeliving.dto.order.ProductOrderRequest;
import com.project.homeliving.dto.order.ProductOrderResponse;
import com.project.homeliving.dto.order.OrderSearch;
import org.springframework.data.domain.Page;

public interface IProductOrderService {
    ProductOrderResponse detail(Long id);
    Page<ProductOrderResponse> search(OrderSearch search, Boolean searchMine);
    ProductOrderResponse create(ProductOrderRequest request);
    ProductOrderResponse update(Long id, ProductOrderRequest request);
    void delete(Long id);
}

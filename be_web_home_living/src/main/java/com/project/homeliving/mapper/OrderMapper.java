package com.project.homeliving.mapper;

import com.project.homeliving.dto.order.OrderDetailResponse;
import com.project.homeliving.dto.order.OrderResponse;
import com.project.homeliving.entity.order.Order;
import com.project.homeliving.entity.order.OrderDetail;
import com.project.homeliving.util.ObjectMapperUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Component
public class OrderMapper {
    public OrderResponse toResponse(Order order){
        OrderResponse response = ObjectMapperUtils.map(order, OrderResponse.class);

        try {
            if(order.getCustomer() != null) {
                response.setCustomerId(order.getCustomer().getId());
                response.setCustomerName(order.getCustomer().getFullName());
            }

            if(order.getStaff() != null) {
                response.setStaffId(order.getStaff().getId());
                response.setStaffName(order.getStaff().getFullName());
            }


            // Map OrderDetails
            if(order.getOrderDetails() != null && !order.getOrderDetails().isEmpty()) {
                List<OrderDetailResponse> orderDetailResponses = order.getOrderDetails().stream()
                        .map(this::toOrderDetailResponse)
                        .collect(Collectors.toList());
                response.setOrderDetails(orderDetailResponses);
            }

        }catch (Exception e){
            log.error("Lỗi khi map order: {}", e.getMessage());
        }

        return response;
    }

    private OrderDetailResponse toOrderDetailResponse(OrderDetail orderDetail) {
        return OrderDetailResponse.builder()
                .id(orderDetail.getId())
                .productId(orderDetail.getProduct().getId())
                .productName(orderDetail.getProduct().getName())
                .productImage(orderDetail.getProduct().getImage())
                .quantity(orderDetail.getQuantity())
                .unitPrice(orderDetail.getUnitPrice())
                .totalPrice(orderDetail.getTotalPrice())
                .build();
    }
}

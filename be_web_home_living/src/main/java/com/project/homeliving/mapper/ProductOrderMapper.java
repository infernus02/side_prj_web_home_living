package com.project.homeliving.mapper;

import com.project.homeliving.dto.order.OrderDetailResponse;
import com.project.homeliving.dto.order.ProductOrderResponse;
import com.project.homeliving.entity.order.Order;
import com.project.homeliving.entity.order.OrderDetail;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Component
public class ProductOrderMapper {

    public ProductOrderResponse toResponse(Order order) {
        ProductOrderResponse response = ProductOrderResponse.builder()
                .id(order.getId())
                .type(order.getType())
                .totalAmount(order.getTotalAmount())
                .discount(order.getDiscount())
                .paymentType(order.getPaymentType())
                .paymentStatus(order.getPaymentStatus())
                .orderTime(order.getOrderTime())
                .build();

        try {
            // Customer info
            if (order.getCustomer() != null) {
                response.setCustomerId(order.getCustomer().getId());
                response.setCustomerName(order.getCustomer().getFullName());
            }

            // Staff info
            if (order.getStaff() != null) {
                response.setStaffId(order.getStaff().getId());
                response.setStaffName(order.getStaff().getFullName());
            }

            // OrderDetails
            if (order.getOrderDetails() != null) {
                List<OrderDetailResponse> orderDetailResponses = order.getOrderDetails().stream()
                        .map(this::toOrderDetailResponse)
                        .collect(Collectors.toList());
                response.setOrderDetails(orderDetailResponses);
            }

        } catch (Exception e) {
            log.error("Error when converting Order to ProductOrderResponse: {}", e.getMessage());
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

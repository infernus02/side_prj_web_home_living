package com.project.homeliving.dto.order;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderResponse {
    Long id;
    String type;  // "PRODUCT" hoặc "TREATMENT"
    Double totalAmount;
    Double discount;
    String paymentType;
    String paymentStatus;
    LocalDateTime orderTime;

    Long customerId;
    String customerName;
    Long staffId;
    String staffName;
    Long treatmentId;
    String treatmentName;
    Double treatmentPrice;

    List<OrderDetailResponse> orderDetails;
}

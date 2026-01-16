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
public class OrderRequest {
    String type;  // "PRODUCT" hoặc "TREATMENT"
    Double discount;
    String paymentType;
    String paymentStatus;
    LocalDateTime orderTime;

    Long customerId;
    Long treatmentId;           // Optional - có thể null
    List<OrderDetailRequest> orderDetails;  // Danh sách sản phẩm
}

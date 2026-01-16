package com.project.homeliving.dto.order;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TreatmentOrderRequest {
    Double discount;
    String paymentType;
    String paymentStatus;
    LocalDateTime orderTime;

    Long customerId;
    Long staffId;
    Long treatmentId;  // Bắt buộc cho Treatment Order
}

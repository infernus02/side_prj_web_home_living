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
public class TreatmentOrderResponse {
    Long id;
    String type;  // "TREATMENT"
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
}

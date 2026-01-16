package com.project.homeliving.dto.order;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderDetailResponse {
    Long id;
    Long productId;
    String productName;
    String productImage;
    Integer quantity;
    Double unitPrice;
    Double totalPrice;
}

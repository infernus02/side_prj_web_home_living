package com.project.homeliving.dto.order;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderDetailRequest {
    Long productId;
    Integer quantity;
    Double unitPrice;  // Optional - có thể lấy từ Product.price
}

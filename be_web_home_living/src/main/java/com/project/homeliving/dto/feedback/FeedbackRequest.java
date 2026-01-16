package com.project.homeliving.dto.feedback;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FeedbackRequest {
    Double rating;      // Chỉ Customer mới có rating
    String comment;
    Long customerId;    // Chỉ Customer feedback
    Long productId;     // Có thể null
}

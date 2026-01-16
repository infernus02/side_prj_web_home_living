package com.project.homeliving.dto.feedback;

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
public class FeedbackResponse {
    Long id;
    Double rating;          // Chỉ User feedback mới có
    String comment;
    String feedbackType;    // "CUSTOMER" hoặc ""
    LocalDateTime createDate;

    Boolean isOwner;
    // User info (nếu là User feedback)
    Long customerId;
    String customerName;
    String customerAvatar;

    // Treatment/Product info
    Long treatmentId;
    String treatmentName;
    Long productId;
    String productName;

    // Parent feedback info (nếu là reply)
    Long parentFeedbackId;

    // Replies từ Staff (nếu là feedback gốc)
    List<FeedbackResponse> replies;
}

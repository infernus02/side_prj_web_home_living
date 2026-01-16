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
    Double rating;          // Chỉ Customer feedback mới có
    String comment;
    String feedbackType;    // "CUSTOMER" hoặc "STAFF_REPLY"
    LocalDateTime createDate;

    Boolean isOwner;
    // Customer info (nếu là Customer feedback)
    Long customerId;
    String customerName;
    String customerAvatar;

    // Staff info (nếu là Staff reply)
    Long staffId;
    String staffName;
    String staffAvatar;

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

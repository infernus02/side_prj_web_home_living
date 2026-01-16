package com.project.homeliving.dto.feedback;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FeedbackReplyRequest {
    String comment;
    Long staffId;
    Long parentFeedbackId;  // ID của feedback gốc mà Staff đang reply
}

package com.project.homeliving.mapper;

import com.project.homeliving.dto.feedback.FeedbackResponse;
import com.project.homeliving.entity.feedback.Feedback;
import com.project.homeliving.service.interfaces.user.IAuthenService;
import com.project.homeliving.util.ObjectMapperUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class FeedbackMapper {
    private final IAuthenService authenService;

    public FeedbackResponse toResponse(Feedback feedback){
        FeedbackResponse response = ObjectMapperUtils.map(feedback, FeedbackResponse.class);

        try {
            // User info (nếu là User feedback)
            if(feedback.getUser() != null) {
                response.setCustomerId(feedback.getUser().getId());
                response.setCustomerName(feedback.getUser().getFullName());
                response.setCustomerAvatar(feedback.getUser().getAvatar());
            }

            // Product info
            if(feedback.getProduct() != null) {
                response.setProductId(feedback.getProduct().getId());
                response.setProductName(feedback.getProduct().getName());
            }

            // Parent feedback info
            if(feedback.getParentFeedback() != null) {
                response.setParentFeedbackId(feedback.getParentFeedback().getId());
            }

            // Replies (chỉ load cho feedback gốc, không load nested)
            if(feedback.getReplies() != null && !feedback.getReplies().isEmpty() && feedback.getParentFeedback() == null) {
                List<FeedbackResponse> replyResponses = feedback.getReplies().stream()
                        .filter(reply -> !Boolean.TRUE.equals(reply.getIsDelete()))
                        .map(this::toSimpleResponse) // Không load nested replies
                        .collect(Collectors.toList());
                response.setReplies(replyResponses);
            }

        }catch (Exception e){
            log.error("Lỗi khi map feedback: {}", e.getMessage());
        }

        return response;
    }

    // Simple response không load replies để tránh infinite loop
    private FeedbackResponse toSimpleResponse(Feedback feedback) {
        FeedbackResponse response = ObjectMapperUtils.map(feedback, FeedbackResponse.class);
        try {

        } catch (Exception e) {
            log.error("Lỗi khi map simple feedback response: {}", e.getMessage());
        }

        return response;
    }
}

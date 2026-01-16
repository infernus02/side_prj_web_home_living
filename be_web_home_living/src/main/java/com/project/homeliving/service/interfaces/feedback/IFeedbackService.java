package com.project.homeliving.service.interfaces.feedback;

import com.project.homeliving.dto.feedback.FeedbackReplyRequest;
import com.project.homeliving.dto.feedback.FeedbackRequest;
import com.project.homeliving.dto.feedback.FeedbackResponse;
import com.project.homeliving.dto.feedback.FeedbackSearch;
import com.project.homeliving.entity.feedback.Feedback;
import org.springframework.data.domain.Page;

public interface IFeedbackService {
    Feedback findById(Long id);
    FeedbackResponse detail(Long id);
    Page<FeedbackResponse> search(FeedbackSearch search);

    // Customer feedback (chỉ 1 lần)
    FeedbackResponse create(FeedbackRequest request);
    FeedbackResponse update(Long id, FeedbackRequest request);

    // Staff reply (nhiều lần)
    FeedbackResponse replyFeedback(FeedbackReplyRequest request);

    Boolean checkFeedback(Long treatmentId, Long productId);
    void delete(Long id);
}

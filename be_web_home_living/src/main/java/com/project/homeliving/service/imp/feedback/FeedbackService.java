package com.project.homeliving.service.imp.feedback;

import com.project.homeliving.dto.feedback.FeedbackReplyRequest;
import com.project.homeliving.dto.feedback.FeedbackRequest;
import com.project.homeliving.dto.feedback.FeedbackResponse;
import com.project.homeliving.dto.feedback.FeedbackSearch;
import com.project.homeliving.dto.user.response.CustomerResponse;
import com.project.homeliving.dto.user.response.StaffResponse;
import com.project.homeliving.entity.feedback.Feedback;
import com.project.homeliving.entity.product.Product;
import com.project.homeliving.entity.user.Customer;
import com.project.homeliving.entity.user.Staff;
import com.project.homeliving.exception.AppException;
import com.project.homeliving.exception.ErrorCode;
import com.project.homeliving.mapper.FeedbackMapper;
import com.project.homeliving.repository.feedback.IFeedbackRepository;
import com.project.homeliving.service.interfaces.feedback.IFeedbackService;
import com.project.homeliving.service.interfaces.user.IAuthenService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class FeedbackService implements IFeedbackService {
    private final IFeedbackRepository feedbackRepository;
    private final FeedbackMapper feedbackMapper;
    private final IAuthenService authenService;

    @Override
    public Feedback findById(Long id) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.FEEDBACK_NOT_FOUND));
        if(Boolean.TRUE.equals(feedback.getIsDelete()))
            throw new AppException(ErrorCode.CATEGORY_NOT_FOUND);
        return feedback;
    }

    @Override
    public FeedbackResponse detail(Long id) {
        var entity = this.findById(id);
        return feedbackMapper.toResponse(entity);
    }

    @Override
    public Page<FeedbackResponse> search(FeedbackSearch search) {
        Pageable pageable = PageRequest.of(search.getPage() - 1,
                search.getLimit());

        Page<FeedbackResponse> responses = null;

        return responses;
    }

    @Override
    public FeedbackResponse create(FeedbackRequest request) {


        if (request.getProductId() != null) {
            List<Feedback> existingFeedback = feedbackRepository.findCustomerFeedbackForProduct(
                    request.getCustomerId(), request.getProductId());
            if (existingFeedback.size() != 0) {
                log.error(">>>feed back đã tồn tại với customer {} và product {}", request.getCustomerId(), request.getProductId());
                throw new AppException(ErrorCode.FEEDBACK_ALREADY_EXISTS);
            }
        }



        CustomerResponse customerResponse = authenService.getCustomerInContext();
        log.info(">>>> customer info = {}", customerResponse);

        Feedback feedback = Feedback.builder()
                .rating(request.getRating())
                .comment(request.getComment())
                .feedbackType("CUSTOMER")
                .customer( new Customer(customerResponse.getId())  )
                .product(request.getProductId() != null ? new Product(request.getProductId()) : null)
                .build();

        feedbackRepository.save(feedback);

        return feedbackMapper.toResponse(feedback);
    }

    @Override
    public FeedbackResponse update(Long id, FeedbackRequest request) {
        Feedback feedback = this.findById(id);

        feedback.setRating(request.getRating());
        feedback.setComment(request.getComment());

        return feedbackMapper.toResponse(feedbackRepository.save(feedback));
    }

    @Override
    public FeedbackResponse replyFeedback(FeedbackReplyRequest request) {
        // Validate parent feedback exists
        Feedback parentFeedback = this.findById(request.getParentFeedbackId());

        // Validate: Chỉ có thể reply feedback gốc của Customer (không reply reply)
        if (parentFeedback.getParentFeedback() != null) {
            throw new AppException(ErrorCode.INVALID_REQUEST);
        }

        // Validate: Parent feedback phải là của Customer
        if (!"CUSTOMER".equals(parentFeedback.getFeedbackType())) {
            throw new AppException(ErrorCode.INVALID_REQUEST);
        }

        StaffResponse staffResponse = authenService.getStafInContext();

        Feedback replyFeedback = Feedback.builder()
                .comment(request.getComment())
                .feedbackType("STAFF_REPLY")
                .staff(new Staff(staffResponse.getId()))
                .parentFeedback(parentFeedback)
                .product(parentFeedback.getProduct())     // Inherit từ parent
                .build();

        feedbackRepository.save(replyFeedback);

        return feedbackMapper.toResponse(replyFeedback);
    }

    @Override
    public Boolean checkFeedback(Long treatmentId, Long productId) {
        CustomerResponse customerResponse = authenService.getCustomerInContext();

        if(treatmentId != null) {
            List<Feedback> feedbacks = feedbackRepository.findCustomerFeedbackForProduct
                    (customerResponse.getId(), productId);
            if(feedbacks.size() != 0)
                return true;
        }
        return false;
    }

    @Override
    public void delete(Long id) {
        Feedback feedback = this.findById(id);

        // Validate: Không thể xóa feedback nếu còn có replies từ staff
//        if (feedbackRepository.hasActiveReplies(id)) {
//            throw new AppException(ErrorCode.CANNOT_DELETE_FEEDBACK_HAS_REPLIES);
//        }

        feedback.setIsDelete(true);
        feedbackRepository.save(feedback);
    }
}

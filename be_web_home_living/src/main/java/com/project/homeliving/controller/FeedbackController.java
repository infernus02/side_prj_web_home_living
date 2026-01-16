package com.project.homeliving.controller;

import com.project.homeliving.dto.feedback.FeedbackReplyRequest;
import com.project.homeliving.dto.feedback.FeedbackRequest;
import com.project.homeliving.dto.feedback.FeedbackSearch;
import com.project.homeliving.exception.ApiResponse;
import com.project.homeliving.service.interfaces.feedback.IFeedbackService;
import com.project.homeliving.util.StrUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/feedback")
@RequiredArgsConstructor
@Tag(name = "feedback controller")
public class FeedbackController {
    private final IFeedbackService feedbackService;

    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "check-exits")
    @GetMapping("/check-feedback")
    ApiResponse<?> checkWasFeedback(@RequestParam(value = "treatmentId", required = false) Long treatmentId,
                                    @RequestParam(value = "productId", required = false)Long productId){
        return ApiResponse.<Boolean>builder()
                .data(feedbackService.checkFeedback(treatmentId, productId))
                .build();
    }


    @Operation(summary = "search")
    @GetMapping("")
    ApiResponse<?> search(@RequestParam(name = "keyword", required = false)String keyword,
                          @RequestParam(name = "rating", required = false) Double rating,
                          @RequestParam(name = "treatmentId", required = false) Long treatmentId,
                          @RequestParam(name = "productId", required = false) Long productId,
                          @RequestParam(name = "page", defaultValue = "1")Integer page,
                          @RequestParam(name = "limit", defaultValue = "10")Integer limit){
        FeedbackSearch searchRequest = FeedbackSearch.builder()
                .keyword(StrUtils.toString(keyword))
                .rating(rating)
                .treatementId(treatmentId)
                .productId(productId)
                .page(page)
                .limit(limit)
                .build();

        return ApiResponse.<Object>builder()
                .data(feedbackService.search(searchRequest))
                .build();
    }

    @Operation(summary = "find-details")
    @GetMapping("/{id}")
    ApiResponse<Object> details(@PathVariable Long id){
        return ApiResponse.<Object>builder()
                .data(feedbackService.detail(id))
                .build();
    }

    @Operation(summary = "create user feedback")
    @PostMapping("")
    ApiResponse<?> create( @RequestBody FeedbackRequest request){
        return ApiResponse.<Object>builder()
                .data(feedbackService.create(request))
                .build();
    }

    @Operation(summary = " reply to feedback")
    @PostMapping("/reply")
    ApiResponse<?> replyFeedback(@RequestBody FeedbackReplyRequest request){
        return ApiResponse.<Object>builder()
                .data(feedbackService.replyFeedback(request))
                .build();
    }

    @Operation(summary = "update")
    @PutMapping(value = "/{id}")
    ApiResponse<?>update(@PathVariable Long id, @RequestBody FeedbackRequest request){
        return ApiResponse.<Object>builder()
                .data(feedbackService.update(id, request))
                .build();
    }

    @Operation(summary = "delete")
    @DeleteMapping(value = "/{id}")
    ApiResponse<?>delete(@PathVariable Long id){
        feedbackService.delete(id);
        return ApiResponse.<String>builder()
                .data("delete ok")
                .build();
    }
}

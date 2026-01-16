package com.project.homeliving.dto.feedback;

import com.project.homeliving.dto.common.SearchRequestCommon;
import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
public class FeedbackSearch extends SearchRequestCommon {
    Double rating;
    Long treatementId;
    Long productId;
}

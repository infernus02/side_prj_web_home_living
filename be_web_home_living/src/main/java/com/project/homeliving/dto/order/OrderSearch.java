package com.project.homeliving.dto.order;

import com.project.homeliving.dto.common.SearchRequestCommon;
import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
public class OrderSearch extends SearchRequestCommon {
    String type;
    String paymentType;  // Đổi từ status thành paymentType
}

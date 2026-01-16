package com.project.homeliving.dto.treatment;

import com.project.homeliving.dto.common.SearchRequestCommon;
import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
public class ProductSearch extends SearchRequestCommon {
    Long categoryId;
}

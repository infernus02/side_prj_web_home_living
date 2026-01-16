package com.project.homeliving.dto.treatment;

import com.project.homeliving.dto.common.SearchRequestCommon;
import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
public class CategorySearch extends SearchRequestCommon {
    String categoryType;
}

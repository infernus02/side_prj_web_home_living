package com.project.homeliving.dto.common;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
public class SearchRequestCommon {
    String keyword;
    Integer page = 1;
    Integer limit = 10;
}

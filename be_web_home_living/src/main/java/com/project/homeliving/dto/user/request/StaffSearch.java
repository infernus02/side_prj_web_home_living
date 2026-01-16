package com.project.homeliving.dto.user.request;

import com.project.homeliving.dto.common.SearchRequestCommon;
import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
public class StaffSearch extends SearchRequestCommon {
    String major;
    Boolean status;
}

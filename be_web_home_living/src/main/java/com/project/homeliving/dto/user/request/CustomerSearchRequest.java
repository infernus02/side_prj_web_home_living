package com.project.homeliving.dto.user.request;

import com.project.homeliving.dto.common.SearchRequestCommon;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@SuperBuilder
public class CustomerSearchRequest extends SearchRequestCommon {

}

package com.project.homeliving.dto.statis;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CountResponse {
    Long countCustomer;
    Double renuveMonth;
}

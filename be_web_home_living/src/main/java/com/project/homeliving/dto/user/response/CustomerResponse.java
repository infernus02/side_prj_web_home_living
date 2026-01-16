package com.project.homeliving.dto.user.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerResponse {
    Long id;
    String fullName;
    String phoneNumber;
    String email;
    String note;
    Integer vistCount;
    Double totalSpending;
    String avatar;
    String userName;
    LocalDateTime createDate;

    Long customerId;
}

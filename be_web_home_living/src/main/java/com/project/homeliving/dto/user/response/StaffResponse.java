package com.project.homeliving.dto.user.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StaffResponse {
    Long id;
    String avatar;
    String fullName;
    String phoneNumber;
    String email;
    String major;
    Boolean status;
    String username;
}

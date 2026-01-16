package com.project.homeliving.dto.authen.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChangeProfileRequest {
    String email;
    String fullname;
    String phone;
    String avatar;
    String address;
}

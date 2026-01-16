package com.project.homeliving.dto.user.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountRequest {
    String username;
    String email;
    String fullname;
    String phone;
    String avatar;
    String address;
    String password;
    String role;
}

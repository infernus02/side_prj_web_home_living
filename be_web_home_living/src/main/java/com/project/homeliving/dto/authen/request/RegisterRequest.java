package com.project.homeliving.dto.authen.request;

import com.project.homeliving.dto.user.request.AccountRequest;
import com.project.homeliving.dto.user.request.UserRequest;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RegisterRequest {
    AccountRequest account;
    UserRequest user;
}

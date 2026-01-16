package com.project.homeliving.dto.user.request;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerRequest {
    String fullName;
    String phoneNumber;
    String email;
    @NotNull(message = "Username không được để trống")
    String userName;
    @NotNull(message = "Password không được để trống")
    String password;
}

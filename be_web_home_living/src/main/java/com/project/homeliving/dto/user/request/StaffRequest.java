package com.project.homeliving.dto.user.request;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StaffRequest {
    MultipartFile avatar;
    String fullName;
    String phoneNumber;
    String email;
    String major;
    String username;
    String password;
}

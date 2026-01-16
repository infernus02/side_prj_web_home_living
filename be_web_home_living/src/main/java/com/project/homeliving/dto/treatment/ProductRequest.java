package com.project.homeliving.dto.treatment;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductRequest {
    MultipartFile image;
    String name;
    Double price;
    Long quantity;
    String supplier;
    Long categoryId;
}

package com.project.homeliving.dto.statis;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RevenueReportResponse {
    LocalDate date;
    String dateLabel; // "01/11/2024"
    String name; // Tên nhân viên hoặc dịch vụ
    Double revenue; // Doanh thu
    Double commission; // Hoa hồng (nếu có)
    Double profit; // Lợi nhuận (revenue - commission)
    String type; // "daily", "", "service"
}

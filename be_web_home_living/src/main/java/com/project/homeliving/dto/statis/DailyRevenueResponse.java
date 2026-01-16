package com.project.homeliving.dto.statis;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DailyRevenueResponse {
    private LocalDate date;
    private String dateLabel; // "01/01", "02/01", etc.
    private Double revenue;
}

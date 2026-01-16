package com.project.homeliving.dto.statis;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TodayScheduleResponse {
    private LocalTime time;
    private String timeLabel; // "09:00", "10:30", etc.
    private String customerName;
    private String treatmentName;
    private String status; // "Đã hoàn thành", "Đang thực hiện", "Đã đặt"
    private String statusColor; // "green", "yellow", "blue"
}

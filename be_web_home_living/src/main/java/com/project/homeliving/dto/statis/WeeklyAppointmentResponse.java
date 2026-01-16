package com.project.homeliving.dto.statis;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WeeklyAppointmentResponse {
    private String dayOfWeek; // "T2", "T3", "T4", "T5", "T6", "T7", "CN"
    private Integer appointmentCount;
}

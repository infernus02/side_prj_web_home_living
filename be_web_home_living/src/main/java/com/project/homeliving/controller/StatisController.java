package com.project.homeliving.controller;

import com.project.homeliving.dto.statis.DailyRevenueResponse;
import com.project.homeliving.dto.statis.RevenueReportResponse;
import com.project.homeliving.dto.statis.WeeklyAppointmentResponse;
import com.project.homeliving.dto.statis.TodayScheduleResponse;
import com.project.homeliving.exception.ApiResponse;
import com.project.homeliving.service.interfaces.statis.IStatisService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/statis")
@RequiredArgsConstructor
@Tag(name = "Statistics Controller", description = "APIs for statistics and charts")
public class StatisController {

    private final IStatisService statisService;


    @Operation(summary = "Doanh thu 7 ngày gần đây")
    @GetMapping("/revenue/daily")
    ApiResponse<List<DailyRevenueResponse>> getDailyRevenue(
            @RequestParam(name = "startDate", required = false) String startDate) {

        LocalDate start = startDate != null ? LocalDate.parse(startDate) : LocalDate.now().minusDays(6);

        return ApiResponse.<List<DailyRevenueResponse>>builder()
                .data(null)
                .build();
    }

    @Operation(summary = "Lịch hẹn theo ngày trong tuần")
    @GetMapping("/appointments/weekly")
    ApiResponse<List<WeeklyAppointmentResponse>> getWeeklyAppointments(
            @RequestParam(name = "startDate", required = false) String startDate) {

        LocalDate start = startDate != null ? LocalDate.parse(startDate) : LocalDate.now().with(java.time.DayOfWeek.MONDAY);

        return ApiResponse.<List<WeeklyAppointmentResponse>>builder()
                .data(null)
                .build();
    }

    @Operation(summary = "Lịch hẹn hôm nay")
    @GetMapping("/schedule/today")
    ApiResponse<List<TodayScheduleResponse>> getTodaySchedule(
            @RequestParam(name = "date", required = false) String date) {

        LocalDate targetDate = date != null ? LocalDate.parse(date) : LocalDate.now();

        return ApiResponse.<List<TodayScheduleResponse>>builder()
                .data(null)
                .build();
    }

    @Operation(summary = "Báo cáo doanh thu theo loại")
    @GetMapping("/revenue/report")
    public ApiResponse<List<RevenueReportResponse>> getRevenueReport(
            @RequestParam(name = "type") String type, // "daily",  "service"
            @RequestParam(name = "startDate", required = false) String startDate,
            @RequestParam(name = "endDate", required = false) String endDate) {

        LocalDate start = startDate != null ? LocalDate.parse(startDate) : LocalDate.now().minusDays(30);
        LocalDate end = endDate != null ? LocalDate.parse(endDate) : LocalDate.now();

        return ApiResponse.<List<RevenueReportResponse>>builder()
                .data(null)
                .build();
    }
}

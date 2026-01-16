package com.project.homeliving.util;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class DateTimeUtils {
    private static final ZoneId VIETNAM_ZONE = ZoneId.of("Asia/Ho_Chi_Minh");

    public static LocalDateTime getLocalDateTimeVN() {
        return ZonedDateTime.now(VIETNAM_ZONE).toLocalDateTime();
    }
}

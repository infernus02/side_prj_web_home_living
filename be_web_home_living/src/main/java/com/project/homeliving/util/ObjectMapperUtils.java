package com.project.homeliving.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;

@Slf4j
public class ObjectMapperUtils {

    private ObjectMapperUtils() {
    }

    public static <T> T map(Object source, Class<T> targetClass) {
        if (source == null) {
            return null;
        }
        try {
            // Tạo instance mới của target class
            T target = targetClass.getDeclaredConstructor().newInstance();
            // Copy properties cấp 1
            BeanUtils.copyProperties(source, target);
            return target;
        } catch (Exception e) {
            log.error("Error mapping object from {} to {}: {}",
                source.getClass().getSimpleName(),
                targetClass.getSimpleName(),
                e.getMessage());
            return null;
        }
    }
}

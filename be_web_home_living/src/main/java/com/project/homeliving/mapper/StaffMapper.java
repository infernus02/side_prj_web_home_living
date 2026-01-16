package com.project.homeliving.mapper;

import com.project.homeliving.dto.user.response.StaffResponse;
import com.project.homeliving.entity.user.Staff;
import com.project.homeliving.util.ObjectMapperUtils;
import org.springframework.stereotype.Component;

@Component
public class StaffMapper {
    public StaffResponse toResponse (Staff staff){
        StaffResponse response = ObjectMapperUtils.map(staff, StaffResponse.class);
        response.setUsername(staff.getAccount().getUsername());
        return response;
    }
}

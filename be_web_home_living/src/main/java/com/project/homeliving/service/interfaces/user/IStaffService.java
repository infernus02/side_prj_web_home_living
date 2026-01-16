package com.project.homeliving.service.interfaces.user;

import com.project.homeliving.dto.user.request.StaffRequest;
import com.project.homeliving.dto.user.request.StaffSearch;
import com.project.homeliving.dto.user.response.StaffResponse;
import com.project.homeliving.entity.user.Staff;
import org.springframework.data.domain.Page;

public interface IStaffService {
    Staff findById(Long id);
    StaffResponse detail(Long id);
    Page<StaffResponse> search(StaffSearch search);
    StaffResponse create(StaffRequest request);
    StaffResponse updateProfile(Long id, StaffRequest request);
    void changeStatus(Long id, Boolean status);
    void delete(Long id);
}

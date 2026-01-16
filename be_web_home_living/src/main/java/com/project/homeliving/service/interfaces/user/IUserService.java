package com.project.homeliving.service.interfaces.user;

import com.project.homeliving.dto.user.request.UserRequest;
import com.project.homeliving.dto.user.request.CustomerSearchRequest;
import com.project.homeliving.dto.user.request.CustomerUpdateRequest;
import com.project.homeliving.dto.user.response.UserResponse;
import com.project.homeliving.entity.user.User;
import org.springframework.data.domain.Page;

public interface IUserService {
    User findById(Long id);
    UserResponse detail(Long id);
    Page<UserResponse> search(CustomerSearchRequest search);
    UserResponse create(UserRequest request);
    UserResponse updateProfile(Long id, CustomerUpdateRequest request);
    UserResponse updateProfileInfo(CustomerUpdateRequest request);
    void delete(Long id);
}

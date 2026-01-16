package com.project.homeliving.mapper;

import com.project.homeliving.dto.user.request.UserRequest;
import com.project.homeliving.dto.user.response.UserResponse;
import com.project.homeliving.entity.user.User;
import com.project.homeliving.util.ObjectMapperUtils;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public User toEntity(UserRequest request){
        return ObjectMapperUtils.map(request, User.class);
    }

    public UserResponse toResponse(User user){
        UserResponse response = ObjectMapperUtils.map(user, UserResponse.class);

        if(user.getAccount() != null)
            response.setUserName(user.getAccount().getUsername());

        return response;
    }
}

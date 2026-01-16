package com.project.homeliving.service.interfaces.user;

import com.project.homeliving.dto.authen.request.ChangePassRequest;
import com.project.homeliving.dto.authen.request.LoginRequest;
import com.project.homeliving.dto.authen.request.RegisterRequest;
import com.project.homeliving.dto.authen.response.LoginResponse;
import com.project.homeliving.dto.user.response.AccountResponse;
import com.project.homeliving.dto.user.response.CustomerResponse;
import com.project.homeliving.dto.user.response.StaffResponse;
import com.project.homeliving.entity.user.Account;

public interface IAuthenService {
    LoginResponse register(RegisterRequest request);
    LoginResponse login(LoginRequest request);

    Account getCurrentUser();
    AccountResponse changePassword(ChangePassRequest request);

    StaffResponse getStafInContext();
    CustomerResponse getCustomerInContext();
}

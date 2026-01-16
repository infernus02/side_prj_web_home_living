package com.project.homeliving.service.interfaces.user;

import com.project.homeliving.dto.user.request.CustomerRequest;
import com.project.homeliving.dto.user.request.CustomerSearchRequest;
import com.project.homeliving.dto.user.request.CustomerUpdateRequest;
import com.project.homeliving.dto.user.response.CustomerResponse;
import com.project.homeliving.entity.user.Customer;
import org.springframework.data.domain.Page;

public interface ICustomerService {
    Customer findById(Long id);
    CustomerResponse detail(Long id);
    Page<CustomerResponse> search(CustomerSearchRequest search);
    CustomerResponse create(CustomerRequest request);
    CustomerResponse updateProfile(Long id, CustomerUpdateRequest request);
    CustomerResponse updateProfileInfo(CustomerUpdateRequest request);
    void delete(Long id);
}

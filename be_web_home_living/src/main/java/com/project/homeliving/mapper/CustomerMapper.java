package com.project.homeliving.mapper;

import com.project.homeliving.dto.user.request.CustomerRequest;
import com.project.homeliving.dto.user.response.CustomerResponse;
import com.project.homeliving.entity.user.Customer;
import com.project.homeliving.util.ObjectMapperUtils;
import org.springframework.stereotype.Component;

@Component
public class CustomerMapper {
    public Customer toEntity(CustomerRequest request){
        return ObjectMapperUtils.map(request, Customer.class);
    }

    public CustomerResponse toResponse(Customer customer){
        CustomerResponse response = ObjectMapperUtils.map(customer, CustomerResponse.class);

        if(customer.getAccount() != null)
            response.setUserName(customer.getAccount().getUsername());

        return response;
    }
}

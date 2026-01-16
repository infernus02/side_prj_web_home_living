package com.project.homeliving.service.imp.user;

import com.project.homeliving.dto.user.request.CustomerRequest;
import com.project.homeliving.dto.user.request.CustomerSearchRequest;
import com.project.homeliving.dto.user.request.CustomerUpdateRequest;
import com.project.homeliving.dto.user.response.CustomerResponse;
import com.project.homeliving.entity.user.Account;
import com.project.homeliving.entity.user.Customer;
import com.project.homeliving.entity.user.Role;
import com.project.homeliving.enums.RoleEnum;
import com.project.homeliving.exception.AppException;
import com.project.homeliving.exception.ErrorCode;
import com.project.homeliving.mapper.CustomerMapper;
import com.project.homeliving.repository.user.IAccountRepository;
import com.project.homeliving.repository.user.ICustomerRepository;
import com.project.homeliving.service.interfaces.user.IAuthenService;
import com.project.homeliving.service.interfaces.user.ICustomerService;
import com.project.homeliving.util.FileUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CustomerService implements ICustomerService {
    private final ICustomerRepository customerRepository;
    private final IAccountRepository accountRepository;
    private final CustomerMapper customerMapper;
    private final PasswordEncoder passwordEncoder;
    private final IAuthenService authenService;

    @Override
    public Customer findById(Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CUSTOMER_NOT_FOUND));
    }

    @Override
    public CustomerResponse detail(Long id) {
        return customerMapper.toResponse(this.findById(id));
    }

    @Override
    public Page<CustomerResponse> search(CustomerSearchRequest search) {
        try {
            Pageable pageable = PageRequest.of(search.getPage() - 1, search.getLimit());
            Page<CustomerResponse> responses = customerRepository.search(
                    search.getKeyword(), pageable
            ).map(it -> customerMapper.toResponse(it));
            return responses;
        }catch (Exception e){
            log.error("Lỗi khi search customer: {}", e.getMessage());
            return null;
        }
    }

    @Override
    public CustomerResponse create(CustomerRequest request) {
        if(accountRepository.existsByUsername(request.getUserName()))
            throw new AppException(ErrorCode.USERNAME_WAS_REGISTER);

        Account account = Account.builder()
                .username(request.getUserName())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(new Role(RoleEnum.CUSTOMER.name()))
                .build();
        accountRepository.save(account);

        var entity = customerMapper.toEntity(request);
        entity.setAccount(account);
        customerRepository.save(entity);

        return customerMapper.toResponse(entity);
    }

    @Override
    public CustomerResponse updateProfile(Long id, CustomerUpdateRequest request) {
        Customer customer = this.findById(id);

        customer.setFullName(request.getFullName());
        customer.setPhoneNumber(request.getPhoneNumber());
        customer.setEmail(request.getEmail());

        if(request.getAvatar() != null && !request.getAvatar().isEmpty()) {
            String image = FileUtils.saveFileWithCustomDir(request.getAvatar());
            customer.setAvatar(image);
        }

        return customerMapper.toResponse(customerRepository.save(customer));
    }

    @Override
    public CustomerResponse updateProfileInfo(CustomerUpdateRequest request) {
        CustomerResponse customerResponse = authenService.getCustomerInContext();

        Customer customer = this.findById(customerResponse.getId());

        customer.setFullName(request.getFullName());
        customer.setPhoneNumber(request.getPhoneNumber());
        customer.setEmail(request.getEmail());

        if(request.getAvatar() != null && !request.getAvatar().isEmpty()) {
            String image = FileUtils.saveFileWithCustomDir(request.getAvatar());
            customer.setAvatar(image);
        }

        return customerMapper.toResponse(customerRepository.save(customer));
    }

    @Override
    public void delete(Long id) {
        Customer customer = this.findById(id);

        // Validate: Không thể xóa customer nếu còn có dữ liệu liên quan
        if (customerRepository.hasActiveOrders(id)) {
            throw new AppException(ErrorCode.CANNOT_DELETE_CUSTOMER_HAS_ORDERS);
        }

        if (customerRepository.hasActiveFeedbacks(id)) {
            throw new AppException(ErrorCode.CANNOT_DELETE_CUSTOMER_HAS_FEEDBACKS);
        }

        customer.setIsDelete(true);
        customerRepository.save(customer);
    }
}

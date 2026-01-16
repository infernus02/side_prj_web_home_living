package com.project.homeliving.service.imp.user;

import com.project.homeliving.dto.user.request.UserRequest;
import com.project.homeliving.dto.user.request.CustomerSearchRequest;
import com.project.homeliving.dto.user.request.CustomerUpdateRequest;
import com.project.homeliving.dto.user.response.UserResponse;
import com.project.homeliving.entity.user.Account;
import com.project.homeliving.entity.user.User;
import com.project.homeliving.entity.user.Role;
import com.project.homeliving.enums.RoleEnum;
import com.project.homeliving.exception.AppException;
import com.project.homeliving.exception.ErrorCode;
import com.project.homeliving.mapper.UserMapper;
import com.project.homeliving.repository.user.IAccountRepository;
import com.project.homeliving.repository.user.IUserRepository;
import com.project.homeliving.service.interfaces.user.IAuthenService;
import com.project.homeliving.service.interfaces.user.IUserService;
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
public class UserService implements IUserService {
    private final IUserRepository customerRepository;
    private final IAccountRepository accountRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final IAuthenService authenService;

    @Override
    public User findById(Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CUSTOMER_NOT_FOUND));
    }

    @Override
    public UserResponse detail(Long id) {
        return userMapper.toResponse(this.findById(id));
    }

    @Override
    public Page<UserResponse> search(CustomerSearchRequest search) {
        try {
            Pageable pageable = PageRequest.of(search.getPage() - 1, search.getLimit());
            Page<UserResponse> responses = customerRepository.search(
                    search.getKeyword(), pageable
            ).map(it -> userMapper.toResponse(it));
            return responses;
        }catch (Exception e){
            log.error("Lỗi khi search user: {}", e.getMessage());
            return null;
        }
    }

    @Override
    public UserResponse create(UserRequest request) {
        if(accountRepository.existsByUsername(request.getUserName()))
            throw new AppException(ErrorCode.USERNAME_WAS_REGISTER);

        Account account = Account.builder()
                .username(request.getUserName())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(new Role(RoleEnum.CUSTOMER.name()))
                .build();
        accountRepository.save(account);

        var entity = userMapper.toEntity(request);
        entity.setAccount(account);
        customerRepository.save(entity);

        return userMapper.toResponse(entity);
    }

    @Override
    public UserResponse updateProfile(Long id, CustomerUpdateRequest request) {
        User user = this.findById(id);

        user.setFullName(request.getFullName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setEmail(request.getEmail());

        if(request.getAvatar() != null && !request.getAvatar().isEmpty()) {
            String image = FileUtils.saveFileWithCustomDir(request.getAvatar());
            user.setAvatar(image);
        }

        return userMapper.toResponse(customerRepository.save(user));
    }

    @Override
    public UserResponse updateProfileInfo(CustomerUpdateRequest request) {
        UserResponse userResponse = null;

        User user = this.findById(userResponse.getId());

        user.setFullName(request.getFullName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setEmail(request.getEmail());

        if(request.getAvatar() != null && !request.getAvatar().isEmpty()) {
            String image = FileUtils.saveFileWithCustomDir(request.getAvatar());
            user.setAvatar(image);
        }

        return userMapper.toResponse(customerRepository.save(user));
    }

    @Override
    public void delete(Long id) {
        User user = this.findById(id);

        // Validate: Không thể xóa user nếu còn có dữ liệu liên quan
        if (customerRepository.hasActiveOrders(id)) {
            throw new AppException(ErrorCode.CANNOT_DELETE_CUSTOMER_HAS_ORDERS);
        }

        if (customerRepository.hasActiveFeedbacks(id)) {
            throw new AppException(ErrorCode.CANNOT_DELETE_CUSTOMER_HAS_FEEDBACKS);
        }

        user.setIsDelete(true);
        customerRepository.save(user);
    }
}

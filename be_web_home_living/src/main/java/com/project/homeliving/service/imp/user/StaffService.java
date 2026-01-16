package com.project.homeliving.service.imp.user;

import com.project.homeliving.dto.user.request.StaffRequest;
import com.project.homeliving.dto.user.request.StaffSearch;
import com.project.homeliving.dto.user.response.StaffResponse;
import com.project.homeliving.entity.user.Account;
import com.project.homeliving.entity.user.Role;
import com.project.homeliving.entity.user.Staff;
import com.project.homeliving.enums.RoleEnum;
import com.project.homeliving.exception.AppException;
import com.project.homeliving.exception.ErrorCode;
import com.project.homeliving.mapper.StaffMapper;
import com.project.homeliving.repository.user.IAccountRepository;
import com.project.homeliving.repository.user.IStaffRepository;
import com.project.homeliving.service.interfaces.user.IStaffService;
import com.project.homeliving.util.FileUtils;
import com.project.homeliving.util.ObjectMapperUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class StaffService implements IStaffService {
    private final IStaffRepository staffRepository;
    private final IAccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final StaffMapper staffMapper;

    @Override
    public Staff findById(Long id) {
        return staffRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.STAFF_NOT_FOUND));
    }

    @Override
    public StaffResponse detail(Long id) {
        var entity = this.findById(id);
        return staffMapper.toResponse(entity);
    }

    @Override
    public Page<StaffResponse> search(StaffSearch search) {
        Pageable pageable = PageRequest.of(search.getPage()-1, search.getLimit());
        Page<StaffResponse> responses = staffRepository.search(
                search.getKeyword(), search.getMajor(), search.getStatus(), pageable
        ).map(it -> staffMapper.toResponse(it));
        return responses;
    }

    @Override
    public StaffResponse create(StaffRequest request) {
        if(accountRepository.existsByUsername(request.getUsername()))
            throw new AppException(ErrorCode.USERNAME_WAS_REGISTER);

        Account account = Account.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(new Role(RoleEnum.STAFF.name()))
                .build();
        accountRepository.save(account);

        var entity = ObjectMapperUtils.map(request, Staff.class);

        if(request.getAvatar() != null && !request.getAvatar().isEmpty()){
            String imageStr = FileUtils.saveFileWithCustomDir(request.getAvatar());
            entity.setAvatar(imageStr);
        }

        entity.setAccount(account);
        entity.setStatus(true);
        staffRepository.save(entity);

        return ObjectMapperUtils.map(entity, StaffResponse.class);
    }

    @Override
    public StaffResponse updateProfile(Long id, StaffRequest request) {
        Staff staff = this.findById(id);

        if(request.getAvatar() != null && !request.getAvatar().isEmpty()){
            String imageStr = FileUtils.saveFileWithCustomDir(request.getAvatar());
            staff.setAvatar(imageStr);
        }

        staff.setFullName(request.getFullName());
        staff.setPhoneNumber(request.getPhoneNumber());
        staff.setEmail(request.getEmail());
        staff.setMajor(request.getMajor());

        staffRepository.save(staff);
        return ObjectMapperUtils.map(staff, StaffResponse.class);
    }

    @Override
    public void changeStatus(Long id, Boolean status) {
        Staff staff = this.findById(id);
        staff.setStatus(status);
        staffRepository.save(staff);
    }

    @Override
    public void delete(Long id) {
        Staff staff = this.findById(id);

        // Validate: Không thể xóa staff nếu còn có dữ liệu liên quan
        if (staffRepository.hasActiveOrders(id)) {
            throw new AppException(ErrorCode.CANNOT_DELETE_STAFF_HAS_ORDERS);
        }

        staff.setIsDelete(true);
        staffRepository.save(staff);
    }
}

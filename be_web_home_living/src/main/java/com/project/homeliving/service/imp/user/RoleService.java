package com.project.homeliving.service.imp.user;

import com.project.homeliving.entity.user.Role;
import com.project.homeliving.exception.AppException;
import com.project.homeliving.exception.ErrorCode;
import com.project.homeliving.repository.user.IRoleRepository;
import com.project.homeliving.service.interfaces.user.IRoleService;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoleService implements IRoleService {
    @Autowired
    private IRoleRepository roleRepository;

    @Override
    public boolean exitsByName(String name) {
        return roleRepository.existsByName(name);
    }

    @Override
    public void create(String name) {
        Role entity = Role.builder()
                .name(name)
                .build();

        roleRepository.save(entity);
    }

    @Override
    public Role findByName(String name) {
        return roleRepository.findByName(name).orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));
    }
}

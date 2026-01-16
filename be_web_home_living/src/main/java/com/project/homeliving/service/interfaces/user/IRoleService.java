package com.project.homeliving.service.interfaces.user;

import com.project.homeliving.entity.user.Role;

public interface IRoleService {
    boolean exitsByName(String name);
    void create(String name);

    Role findByName(String name);
}

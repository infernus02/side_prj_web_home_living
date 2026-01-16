package com.project.homeliving.service.imp.statis;

import com.project.homeliving.repository.user.IUserRepository;
import com.project.homeliving.service.interfaces.statis.IStatisService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class StatisService implements IStatisService {
    private final IUserRepository customerRepository;

}

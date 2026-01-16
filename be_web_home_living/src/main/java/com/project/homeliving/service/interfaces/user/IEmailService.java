package com.project.homeliving.service.interfaces.user;

public interface IEmailService {
    public void sendEmailResetPass(String toEmail, String linkReset);
}

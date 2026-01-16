package com.project.homeliving.service.imp.user;

import com.project.homeliving.exception.AppException;
import com.project.homeliving.exception.ErrorCode;
import com.project.homeliving.service.interfaces.user.IEmailService;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailAuthenticationException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@Transactional
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EmailService implements IEmailService {

    @Autowired
    JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    String fromEmail;

    @Override
    public void sendEmailResetPass(String toEmail, String linkReset) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("teo.dev.2000@gmail.com");
        message.setSubject("Yêu cầu đặt lại mật khẩu");
        message.setText("Chào bạn,\n\n" +
                "Bạn đã yêu cầu đặt lại mật khẩu. Vui lòng nhấn vào liên kết dưới đây để thiết lập lại mật khẩu:\n" +
                linkReset + "\n\n" +
                "Lưu ý: liên kết này sẽ hết hạn sau 15 phút.\n\n" +
                "Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.");

        try {
            mailSender.send(message);
        } catch (MailAuthenticationException e) {
            throw new AppException(ErrorCode.MAIL_CONFIG_MISSING);
        }
//        catch (MailException e) {
//            throw new AppException(ErrorCode.MAIL_SENDING_FAILED);
//        }

    }

}

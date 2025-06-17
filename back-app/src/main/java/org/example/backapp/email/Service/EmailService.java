package org.example.backapp.email.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.example.backapp.email.Model.EmailModel;
import org.example.backapp.email.Repository.EmailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;
@Autowired
private EmailRepository emailRepository;
    public void sendSimpleMessage(String to, String subject, String content) throws MessagingException {
       MimeMessage message = mailSender.createMimeMessage();
       MimeMessageHelper helper = new MimeMessageHelper(message,true);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(content);
        helper.setFrom("\"Natha Hotel\" <hello@demomailtrap.co>");

        mailSender.send(message);
    }

    public  void saveResponse(EmailModel response){
        emailRepository.save(response);
    }
}

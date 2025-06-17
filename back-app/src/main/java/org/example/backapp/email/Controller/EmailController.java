package org.example.backapp.email.Controller;

import jakarta.mail.MessagingException;
import org.example.backapp.email.Model.EmailModel;
import org.example.backapp.email.Repository.EmailRepository;
import org.example.backapp.email.Service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/api/emails")
public class EmailController {
    @Autowired
    private EmailService emailService;
    @Autowired
    private EmailRepository emailRepository;

    @PostMapping("/send")
    public String sendEmail(
            @RequestParam("recipient") String recipient,
            @RequestParam("subject") String subject,
            @RequestParam("body") String body,
            @RequestParam(value = "file",required = false) MultipartFile file
    ) {
        try {
            emailService.sendSimpleMessage(recipient,subject,body);
            return "Email envoyé avec succées";
        } catch (MessagingException e) {
           return "Erreur lors de l'envoi :"+e.getMessage();

        }
    }

    @GetMapping("/conversion/{parentId}")
    public List<EmailModel> getConversion(@PathVariable Long parentId) {
        return emailRepository.findByParentMessageId(parentId);
    }
    @PostMapping("/reply")
    public String replyEmail(@RequestBody EmailModel emailModel) {
        emailService.saveResponse(emailModel);
        return "Reponse enregistré avec succées";
    }
}

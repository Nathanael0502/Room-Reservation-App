package org.example.backapp.email.Model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class EmailModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sender;
    private String recipient;
    private String subject;
    @Column(columnDefinition = "TEXT")
    private String body;
    private LocalDateTime timestamp;

    @ManyToOne
    private EmailModel parentMessage;

    public void setId(Long id) {
        this.id = id;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public void setParentMessage(EmailModel parentMessage) {
        this.parentMessage = parentMessage;
    }

    public Long getId() {
        return id;
    }

    public String getSender() {
        return sender;
    }

    public String getRecipient() {
        return recipient;
    }

    public String getSubject() {
        return subject;
    }

    public String getBody() {
        return body;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public EmailModel getParentMessage() {
        return parentMessage;
    }
}

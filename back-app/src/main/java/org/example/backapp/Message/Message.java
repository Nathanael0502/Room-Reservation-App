package org.example.backapp.Message;

import jakarta.persistence.*;
import org.example.backapp.Client.model.ClientModel;

import java.time.LocalDateTime;

@Entity
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="senderId")
    private ClientModel sender;

    @ManyToOne
    @JoinColumn(name="receiverId")
    private ClientModel receiver;

    private String Message;
    @Column(nullable = true)
    private String photo;
    private LocalDateTime sentAt;

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public Message(){
        this.sentAt=LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ClientModel getSender() {
        return sender;
    }

    public void setSender(ClientModel sender) {
        this.sender = sender;
    }

    public ClientModel getReceiver() {
        return receiver;
    }

    public void setReceiver(ClientModel receiver) {
        this.receiver = receiver;
    }

    public String getMessage() {
        return Message;
    }

    public void setMessage(String message) {
        Message = message;
    }

    public LocalDateTime getSentAt() {
        return sentAt;
    }

    public void setSentAt(LocalDateTime sentAt) {
        this.sentAt = sentAt;
    }
}

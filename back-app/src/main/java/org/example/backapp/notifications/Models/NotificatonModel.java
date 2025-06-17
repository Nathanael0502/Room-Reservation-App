package org.example.backapp.notifications.Models;

import jakarta.persistence.*;
import org.example.backapp.Client.model.ClientModel;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "Notification")
public class NotificatonModel {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int id;
    private String notification;
    private LocalDate notificationDate;
    @ManyToOne
    @JoinColumn(name = "client_id")
    private ClientModel client;

    public void setId(int id) {
        this.id = id;
    }

    public void setNotification(String notification) {
        this.notification = notification;
    }

    public void setNotificationDate(LocalDate notificationDate) {
        this.notificationDate = notificationDate;
    }

    public void setClient(ClientModel client) {
        this.client = client;
    }

    public int getId() {
        return id;
    }

    public String getNotification() {
        return notification;
    }

    public LocalDate getNotificationDate() {
        return notificationDate;
    }

    public ClientModel getClient() {
        return client;
    }
}

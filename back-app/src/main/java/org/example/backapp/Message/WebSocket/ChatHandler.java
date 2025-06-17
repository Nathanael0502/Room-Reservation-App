package org.example.backapp.Message.WebSocket;

import org.example.backapp.Message.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;

@Controller
public class ChatHandler {
    private TestMess messages;
  private Notification notification;
    @MessageMapping("/sendMessage")
    @SendTo("/topic/messages")
    public TestMess sendMessage(TestMess message) {
        messages=message;
        return messages;
    }
    @MessageMapping("/getMessages")
    @SendTo("/topic/messages")
    public TestMess getMessages() {

        return messages;
    }
    @MessageMapping("/SendNotification")
    @SendTo("/topic/notifications")
    public Notification getNotification(Notification notifications) {
        notification=notifications;
        return notification;
    }
    @MessageMapping("/getNotifications")
    @SendTo("/topic/notifications")
    public Notification ListNotification() {
        return notification;
    }
}

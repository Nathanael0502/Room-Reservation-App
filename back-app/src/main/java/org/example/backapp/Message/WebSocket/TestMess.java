package org.example.backapp.Message.WebSocket;

public class TestMess {
    private String Message;
    private ClassTest  sender;
    private ClassTest  receiver;
    private String photo;
    private String test;
    public TestMess(String Message, ClassTest sender, ClassTest receiver) {
        this.Message= Message;
        this.sender = sender;
        this.receiver = receiver;
    }

    public String getTest() {
        return test;
    }

    public void setTest(String test) {
        this.test = test;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getMessage() {
        return Message;
    }

    public void setMessage(String content) {
        this.Message = content;
    }

    public ClassTest getSender() {
        return sender;
    }

    public void setSender(ClassTest sender) {
        this.sender = sender;
    }

    public ClassTest getReceiver() {
        return receiver;
    }

    public void setReceiver(ClassTest receiver) {
        this.receiver = receiver;
    }
}

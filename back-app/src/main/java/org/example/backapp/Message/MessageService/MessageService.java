package org.example.backapp.Message.MessageService;

import org.example.backapp.Client.model.ClientModel;
import org.example.backapp.Client.repository.clientRepository;
import org.example.backapp.Message.Message;
import org.example.backapp.Message.Repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private clientRepository clientRepo;
    private final String uploda="uploadMessage/";
    public Message sendMessage(Long senderId,Long receiverId,String message){
       ClientModel sender=clientRepo.findById(senderId).orElseThrow();
        ClientModel receiver=clientRepo.findById(receiverId).orElseThrow();
        Message newMessage = new Message();
        newMessage.setSender(sender);
        newMessage.setReceiver(receiver);
        newMessage.setMessage(message);
       return  messageRepository.save(newMessage);
    }
    public List<Message> getReceiveMessage(Long senderId,Long receiverId){

        return messageRepository.SearchChat(senderId,receiverId);
    }
    public  List<Message> getAllMessage(ClientModel receiver){
        return messageRepository.findByReceiver(receiver);
    }
    public List<Message> getSentMessage(ClientModel sender){
        return messageRepository.findBySender(sender);
    }
    public Message addMessageWithImg(Long senderId, Long receiverId, String message, MultipartFile photo) throws IOException {
        Path uploadClient= Paths.get(uploda);
        if(!Files.exists(uploadClient)){
            Files.createDirectory(uploadClient);
        }

        String filename=System.currentTimeMillis()+'_'+photo.getOriginalFilename();
        Path filePath=uploadClient.resolve(filename);
        Files.copy(photo.getInputStream(), filePath);
        ClientModel sender=clientRepo.findById(senderId).orElseThrow();
        ClientModel receiver=clientRepo.findById(receiverId).orElseThrow();
        Message newMessage = new Message();
        newMessage.setSender(sender);
        newMessage.setReceiver(receiver);
        newMessage.setMessage(message);
        newMessage.setPhoto(uploda+filename);
        return  messageRepository.save(newMessage);
    }
}

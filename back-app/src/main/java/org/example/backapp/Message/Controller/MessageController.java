package org.example.backapp.Message.Controller;

import org.example.backapp.Message.Message;
import org.example.backapp.Message.MessageService.MessageService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    @Autowired
    private MessageService messageService;
    @PostMapping("/envoi")
    public Message envoiMessage(@RequestParam String message,@RequestParam Long receiverId,@RequestParam Long senderId) {
        return messageService.sendMessage(senderId, receiverId, message);
    }
    @GetMapping("/receive/{receiverId}/{senderId}")
    public List<Message> getAllMessages(@PathVariable Long receiverId,@PathVariable Long senderId){
        return messageService.getReceiveMessage(senderId, receiverId);
    }

    @PostMapping("/withImg")
    public Message sendMessage(@RequestParam String message,@RequestParam Long receiverId,@RequestParam Long senderId,
                               @RequestParam MultipartFile photo) throws IOException {
        return messageService.addMessageWithImg(senderId,receiverId,message,photo);
    }
    @GetMapping("/image/{imageName}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) throws MalformedURLException {
        Path imagePath= Paths.get("uploadMessage/").resolve(imageName);
        Resource resource=  new UrlResource(imagePath.toUri());

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(resource);

    }
}

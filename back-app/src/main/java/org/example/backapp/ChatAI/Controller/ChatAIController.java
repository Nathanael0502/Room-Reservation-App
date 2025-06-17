package org.example.backapp.ChatAI.Controller;

import org.example.backapp.ChatAI.Service.ChatbotService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
public class ChatAIController {
    private final ChatbotService chatbotService;

    public ChatAIController(ChatbotService chatbotService) {
        this.chatbotService = chatbotService;
    }

    @PostMapping
    public String chat(@RequestBody String userMessage) {
        return chatbotService.getResponse(userMessage);
    }
}

package org.example.backapp.ChatAI.Service;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Map;

@Service
public class ChatbotService {
    private final String API_URL = "https://api-inference.huggingface.co/models/gpt2-xl";
    private final String API_KEY = "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";
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String getResponse(String userMessage) {
        if (!userMessage.toLowerCase().contains("chambre")) {
            return "Je ne peux répondre qu'aux questions sur les chambres.";
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + API_KEY);

        Map<String, String> request = Map.of("inputs", userMessage);
        HttpEntity<Map<String, String>> entity = new HttpEntity<>(request, headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(API_URL, HttpMethod.POST, entity, String.class);
            if (response.getStatusCode() == HttpStatus.OK) {
                JsonNode jsonResponse = objectMapper.readTree(response.getBody());
                return jsonResponse.path("generated_text").asText(); // ajustez selon la structure de la réponse
            } else {
                return "Erreur de l'API : " + response.getStatusCode();
            }
        } catch (Exception e) {
            return "Une erreur s'est produite : " + e.getMessage();
        }
    }
}

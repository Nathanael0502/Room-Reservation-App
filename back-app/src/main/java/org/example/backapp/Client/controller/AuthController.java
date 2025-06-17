package org.example.backapp.Client.controller;

import org.example.backapp.Client.model.ClientModel;
import org.example.backapp.Client.service.JwtUtil;
import org.example.backapp.Client.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/auth")
public class AuthController {
    private final UserService userService;
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email=credentials.get("email");
        String password=credentials.get("password");
        Optional<ClientModel> user=userService.authenticate(email,password);
        if(user.isPresent()) {
            String token= JwtUtil.generateToken(email);
            return ResponseEntity.ok(Map.of("token",token,"role",
                    user.get().getRole(),"email",user.get().getEmail(),"nom",user.get().getNom(),
                    "id",user.get().getId(),"telephone",user.get().getTelephone(),"photo",user.get().getPhoto(),"prenom",user.get().getPrenom()));
        }
        return ResponseEntity.status(401).body("Invalid email or password");
    }
}

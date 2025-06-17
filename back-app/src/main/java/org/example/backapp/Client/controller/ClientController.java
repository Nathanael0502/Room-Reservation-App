package org.example.backapp.Client.controller;

import jakarta.annotation.PostConstruct;
import org.example.backapp.Client.model.ClientModel;
import org.example.backapp.Client.repository.clientRepository;
import org.example.backapp.Client.service.clientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/client")
public class ClientController {
    @Autowired
    private clientService clientS;

    @Autowired
    private clientRepository clientR;


    @GetMapping("/affichage")
    public List<ClientModel> affichage() {
        return clientS.getClient();
    }
    @GetMapping("/image/{imageName}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) throws MalformedURLException {
        Path imagePath= Paths.get("uploadClient/").resolve(imageName);
        Resource resource=  new UrlResource(imagePath.toUri());

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(resource);

    }
    @PostMapping("/ajout")
    public ClientModel ajout(@RequestParam String nom,
                             @RequestParam String prenom,
                             @RequestParam String email,
                             @RequestParam String password,
                             @RequestParam String telephone,
                             @RequestParam String role,
                             @RequestParam Long id,
                             @RequestParam MultipartFile photo) throws IOException {
        return  clientS.addClient(nom,prenom,email,password,telephone,role,photo,id);
    }
    @PostConstruct
    public void encrypPassword() {
        BCryptPasswordEncoder encoder= new BCryptPasswordEncoder();

        List<ClientModel> clients = clientR.findAll();
        for (ClientModel client : clients) {
            if(!client.getPassword().startsWith("$2a$")){
                client.setPassword(encoder.encode(client.getPassword()));
                clientR.save(client);
            }
        }
    }

    @DeleteMapping("/{id}/{idU}")
    public List<ClientModel> supprimer(@PathVariable Long id, @PathVariable Long idU) {
      clientS.deleteClient(id,idU);
      return  clientR.findAll();
    }

    @PutMapping("/{id}")
    public List<ClientModel> updateClient(
            @PathVariable Long id,
            @RequestParam String nom,
            @RequestParam String prenom,
            @RequestParam String password,
            @RequestParam String email,
            @RequestParam String telephone,
            @RequestParam String role,
            @RequestParam MultipartFile photo,@RequestParam Long idU    ) throws IOException {
        clientS.updateClient(id,nom,prenom,password,email,telephone,role,photo,idU);
        return  clientR.findAll();
    }
    @PutMapping("/NoFile/{id}")
    public ClientModel updatenoFile(
            @PathVariable Long id,
            @RequestParam String nom,
            @RequestParam String prenom,
            @RequestParam String password,
            @RequestParam String email,
            @RequestParam String telephone,
            @RequestParam String role,@RequestParam Long idU
    ) {
        clientS.updateCli(id, nom,prenom,password,email,telephone,role,idU);
        return clientR.findById(id).orElseThrow();
    }

    @GetMapping("getCli/{id}")
    public Optional<ClientModel> getCli(@PathVariable Long id) {
        return clientR.findById(id);
    }


}

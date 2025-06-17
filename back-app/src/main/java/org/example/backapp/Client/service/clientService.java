package org.example.backapp.Client.service;

import org.example.backapp.Client.model.ClientModel;
import org.example.backapp.Client.repository.clientRepository;
import org.example.backapp.Historiques.Repository.HistoriqueRepository;
import org.example.backapp.Historiques.Service.historiqueService;
import org.example.backapp.Reservation.repository.reservationRepository;
import org.example.backapp.notes.Repository.NoteRepository;
import org.example.backapp.notifications.Repository.NotificationRepository;
import org.example.backapp.paiement.Repository.PaiementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;

@Service
public class clientService {
    @Autowired
    private clientRepository clientRepositor;
    @Autowired
    private historiqueService histService;



    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final String uploda="uploadClient/";
    public ClientModel addClient(String nom, String prenom, String email, String password, String telephone, String role, MultipartFile photo,Long id) throws IOException {
        Path uploadClient= Paths.get(uploda);
        if(!Files.exists(uploadClient)){
            Files.createDirectory(uploadClient);
        }

         String filename=System.currentTimeMillis()+'_'+photo.getOriginalFilename();
        Path filePath=uploadClient.resolve(filename);
        Files.copy(photo.getInputStream(), filePath);
        if(id!=0) {
            histService.AjoutHistorique("Ajout du client: " + nom + " " + prenom, id);
        }
        ClientModel client=new ClientModel();
        client.setNom(nom);
        client.setPrenom(prenom);
        client.setEmail(email);
        client.setPassword(passwordEncoder.encode(password));
        client.setTelephone(telephone);
        client.setRole(role);
        client.setPhoto(uploda+filename);

        return clientRepositor.save(client);


    }
  public List<ClientModel> getClient() {
        return clientRepositor.findAll();
  }
  public ResponseEntity<String> deleteClient(Long id,Long idU) {
        ClientModel client=clientRepositor.findById(id).orElseThrow();
        histService.AjoutHistorique("Suppression du client :"+client.getNom()+" "+client.getPrenom(),idU);
      try {
          clientRepositor.deleteById(id);
          return ResponseEntity.ok("Client deleted");
      }catch(Exception e){
          return ResponseEntity.notFound().build();
      }

  }
    public ClientModel updateClient(
            Long id,
           String nom,
             String prenom,
             String password,
        String email,
         String telephone,
            String role,
          MultipartFile photo,Long idU
    ) throws IOException {
        ClientModel client=clientRepositor.findById(id)
                .orElseThrow(()->new RuntimeException("Client non trouvé"));
      client.setNom(nom);
      client.setPrenom(prenom);
      client.setEmail(email);
      client.setTelephone(telephone);
      client.setRole(role);
   if(Objects.equals(client.getId(), idU)) {
       histService.AjoutHistorique("Modification de votre profil",idU);
   }else{
       histService.AjoutHistorique("Modification de votre profil de: "+nom+" "+prenom,idU);
   }
        if(photo!=null && !photo.isEmpty()){
            String filename= System.currentTimeMillis()+"_"+photo.getOriginalFilename();
            Path filePath=Paths.get(uploda);
            Path upPath=filePath.resolve(filename);
            Files.copy(photo.getInputStream(), upPath);
            client.setPhoto(uploda+filename);
        }
        return clientRepositor.save(client);
    }
    public ClientModel updateCli(
            Long id,
            String nom,
            String prenom,
            String password,
            String email,
            String telephone,
            String role,Long idU
    ) {
        ClientModel client=clientRepositor.findById(id)
                .orElseThrow(()->new RuntimeException("Client non trouvé"));
        client.setNom(nom);
        client.setPrenom(prenom);
        client.setEmail(email);
        client.setTelephone(telephone);
        client.setRole(role);
        if(Objects.equals(client.getId(), idU)) {
            histService.AjoutHistorique("Modification de votre profil",idU);
        }else{
            histService.AjoutHistorique("Modification de votre profil de: "+nom+" "+prenom,idU);
        }
        return clientRepositor.save(client);
    }

}

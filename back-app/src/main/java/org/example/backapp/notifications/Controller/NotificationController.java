package org.example.backapp.notifications.Controller;

import org.example.backapp.Client.model.ClientModel;
import org.example.backapp.Client.repository.clientRepository;
import org.example.backapp.Historiques.Service.historiqueService;
import org.example.backapp.notifications.Models.NotificatonModel;
import org.example.backapp.notifications.Repository.NotificationRepository;
import org.example.backapp.notifications.Service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/notification")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;
   @Autowired
   private historiqueService histService;
   @Autowired
   private clientRepository clientRepo;
    @GetMapping("/liste")
    public List<NotificatonModel> getNotifications() {
        return notificationService.getAllNotifications();
    }
    @PostMapping("/ajout")
    public NotificatonModel addNotification(@RequestParam String notification,@RequestParam Long idCli,
                                            @RequestParam Long idU) {
     ClientModel clientModel=clientRepo.findById(idCli).orElseThrow();
     if(clientModel!=null) {
         histService.AjoutHistorique("Envoi de notification pour: " + clientModel.getNom() + " " + clientModel.getPrenom(), idU);

     }
        return notificationService.createNotification(idCli, notification);
    }
    @DeleteMapping("/move/{id}")
    public ResponseEntity<Map<String,String>> deleteNotification(@PathVariable int id) {
        Map<String,String> map=Map.of("message","notification supprimer");
         notificationService.deleteNotification(id);
return ResponseEntity.ok(map);
    }
    @GetMapping("/listeById/{id}")
    public List<NotificatonModel> getNotificationByClientId(@PathVariable Long id) {
        return notificationService.getNotificationsByClientId(id);
    }
}

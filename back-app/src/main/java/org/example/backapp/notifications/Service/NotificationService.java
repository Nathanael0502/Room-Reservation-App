package org.example.backapp.notifications.Service;

import org.example.backapp.Client.model.ClientModel;
import org.example.backapp.Client.repository.clientRepository;
import org.example.backapp.Historiques.Service.historiqueService;
import org.example.backapp.notifications.Models.NotificatonModel;
import org.example.backapp.notifications.Repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;
    @Autowired
    private clientRepository ClientRepository;
   @Autowired
   private historiqueService histService;

    public NotificatonModel createNotification(Long idCli,String notification) {
    NotificatonModel notificatonModel=new  NotificatonModel();
    notificatonModel.setNotification(notification);
    notificatonModel.setNotificationDate(LocalDate.now());
    ClientModel clientModel=ClientRepository.findById(idCli).orElseThrow();
    notificatonModel.setClient(clientModel);
    return notificationRepository.save(notificatonModel);
    }
    public List<NotificatonModel> getAllNotifications() {
        return notificationRepository.findAll();
    }
    public List<NotificatonModel> getNotificationsByClientId(Long idClient) {
        return notificationRepository.findByClientId(idClient);
    }
    public ResponseEntity<String> deleteNotification(int id) {
        NotificatonModel notificatonModel=notificationRepository.findById(id).orElseThrow();
        histService.AjoutHistorique("Suppression de notification",notificatonModel.getClient().getId());
        notificationRepository.deleteById(id);
        return ResponseEntity.ok("Notification supprimer avec succées");
    }
}

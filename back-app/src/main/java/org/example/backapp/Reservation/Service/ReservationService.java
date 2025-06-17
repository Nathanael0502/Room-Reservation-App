package org.example.backapp.Reservation.Service;

import jakarta.mail.MessagingException;
import org.example.backapp.Client.model.ClientModel;
import org.example.backapp.Client.repository.clientRepository;
import org.example.backapp.Message.WebSocket.ChatHandler;
import org.example.backapp.Message.WebSocket.Notification;
import org.example.backapp.Reservation.Model.ReservationModel;
import org.example.backapp.Reservation.repository.reservationRepository;
import org.example.backapp.chambre.model.Chambre;
import org.example.backapp.chambre.repository.ChambreRepository;
import org.example.backapp.email.Service.EmailService;
import org.example.backapp.notifications.Service.NotificationService;
import org.example.backapp.paiement.Repository.PaiementRepository;
import org.example.backapp.paiement.model.PaiementModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReservationService {
    @Autowired
    private reservationRepository reservRepo;

    @Autowired
    private clientRepository clientRepo;

    @Autowired
    private ChambreRepository ChambreRepo;
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private PaiementRepository paiementRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private  ChatHandler chatHandler;

    public ReservationModel reserver(Long clientId, Long chambreId, LocalDate debut, LocalDate fin) {
        ClientModel client=clientRepo.findById(clientId).orElseThrow();
        Chambre chambre=ChambreRepo.findById(chambreId).orElseThrow();
        if(!chambre.isDisponible()){
            throw new RuntimeException("Chambre is not disponible");
        }
       List<ClientModel> clientModels= clientRepo.findByRole("admin");
        Notification notification=new Notification();
        for(ClientModel clientModel:clientModels){
            notificationService.createNotification(clientModel.getId(),"En attente de confirmation pour le client "+client.getNom()+" "+client.getPrenom());
            notification.setId(clientModel.getId());
            notification.setMessage("En attente de confirmation pour le client "+client.getNom()+" "+client.getPrenom());
           notification.setTitle("Réservation");
           notification.setTimestamp(LocalDateTime.now());
            chatHandler.getNotification(notification);
            try {
                emailService.sendSimpleMessage("natharandrianjafy@gmail.com","Reservation","En attente de confirmation pour le client "+client.getNom()+" "+client.getPrenom());
            } catch (MessagingException e) {
                System.out.println("erreur de connexion"+e.getMessage());
            }
        }

        ReservationModel reservation=new ReservationModel();
        reservation.setClient(client);
        reservation.setDateDebut(debut);
        reservation.setDateFin(fin);
        reservation.setStatut("EN_ATTENTE");

        chambre.setDisponible(false);
        System.out.println(chambre.isDisponible()+" "+chambre.getId());
        ChambreRepo.save(chambre);
        reservation.setChambre(chambre);
        return reservRepo.save(reservation);
    }

    public List<ReservationModel> getAllReservations() {

        return reservRepo.getreservationTommorow(LocalDate.now());
    }
    public List<ReservationModel> getReservation(){
        return reservRepo.findAll();
    }
    public ReservationModel Confirmation(Long id,String statut){
        ReservationModel reservation=reservRepo.findById(id).orElseThrow();
        reservation.setStatut(statut);
        return reservRepo.save(reservation);
    }
    public ReservationModel ModifierReservation(Long id,Long clientId, Long chambreId, LocalDate debut, LocalDate fin){
       ReservationModel reservation=reservRepo.findById(id).orElseThrow();
      ClientModel client=clientRepo.findById(clientId).orElseThrow();
        Chambre chambre=ChambreRepo.findById(chambreId).orElseThrow();
        Chambre oldChambre=reservation.getChambre();
        oldChambre.setDisponible(true);
        if(!chambre.isDisponible()){
            throw new RuntimeException("Chambre is not disponible");
        }
        chambre.setDisponible(false);
        ChambreRepo.save(chambre);



        reservation.setClient(client);
        reservation.setChambre(chambre);
        reservation.setDateDebut(debut);
        reservation.setDateFin(fin);

        return reservRepo.save(reservation);

    }

    public ResponseEntity<String> deleteReservation(Long id){
        ReservationModel res=reservRepo.findById(id).orElseThrow();
        Chambre chambre=ChambreRepo.findById(res.getChambre().getId()).orElseThrow();
        PaiementModel paiementModel=paiementRepository.findByReservationId(id);
        if(paiementModel!=null){
            paiementRepository.deleteById(paiementModel.getId());
        }
        chambre.setDisponible(true);
        ChambreRepo.save(chambre);
        reservRepo.deleteById(id);
        return ResponseEntity.ok("Reservation deleted");
    }
    public  ReservationModel confirmReservation(Long id){
        ReservationModel reservation=reservRepo.findById(id).orElseThrow();
        reservation.setConfirmation(true);
        ClientModel client=clientRepo.findById(reservation.getClient().getId()).orElseThrow();
        Long idCli=client.getId();
        String notification="Votre reservation a été approuvé";
        notificationService.createNotification(idCli,notification);

        try {
            emailService.sendSimpleMessage("natharandrianjafy@gmail.com","Reservation","En attente de confirmation pour le client "+client.getNom()+" "+client.getPrenom());
        } catch (MessagingException e) {
            System.out.println("erreur de connexion");
        }
        return reservRepo.save(reservation);
    }

}

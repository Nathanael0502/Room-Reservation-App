package org.example.backapp.paiement.service;

import jakarta.transaction.Transactional;
import org.example.backapp.Historiques.Service.historiqueService;
import org.example.backapp.Message.WebSocket.ChatHandler;
import org.example.backapp.Message.WebSocket.Notification;
import org.example.backapp.Reservation.Model.ReservationModel;
import org.example.backapp.Reservation.repository.reservationRepository;
import org.example.backapp.chambre.model.Chambre;
import org.example.backapp.chambre.repository.ChambreRepository;
import org.example.backapp.notifications.Service.NotificationService;
import org.example.backapp.paiement.Repository.PaiementRepository;
import org.example.backapp.paiement.model.PaiementModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PaiementService {
    @Autowired
    private PaiementRepository paiementRepository;

    @Autowired
    private reservationRepository resRepository;

    @Autowired
    private ChambreRepository chambreRepository;
   @Autowired
   private NotificationService notificationService;
   @Autowired
   private historiqueService histService;
   @Autowired
   private ChatHandler chatHandler;

    @Transactional
    public PaiementModel effectuerPaiement(Long reservationID,String modePaiement) {
        ReservationModel reservationModel=resRepository.findById(reservationID)
                .orElseThrow(()-> new RuntimeException("reservation not found"));
        Chambre chambre=chambreRepository.findById(reservationModel.getChambre().getId())
                .orElseThrow(()-> new RuntimeException("chambre not found"));
        Double montant=chambre.getPrix();
        Notification notification=new Notification();

        notificationService.createNotification(reservationModel.getClient().getId(),"Paiement effectuer avec succées" + "pour: "+reservationModel.getClient().getNom()+" "+reservationModel.getClient().getPrenom());
        histService.AjoutHistorique("Ajout de paiement de: "+reservationModel.getClient().getNom()+" "+reservationModel.getClient().getPrenom(),reservationModel.getClient().getId());
        Optional<PaiementModel> paiementExistant=paiementRepository.findReservationById(reservationID);
        notification.setTitle("Paiement");
        notification.setTimestamp(LocalDateTime.now());
        notification.setMessage("Ajout de paiement de: "+reservationModel.getClient().getNom()+" "+reservationModel.getClient().getPrenom());
        notification.setId(reservationModel.getClient().getId());
        chatHandler.getNotification(notification);
        if(paiementExistant.isPresent()) {
            throw new RuntimeException("reservation is already paiement");
        }
        reservationModel.setStatut("PAYER");
       Long NbDays= ChronoUnit.DAYS.between(reservationModel.getDateDebut(), reservationModel.getDateFin());
        resRepository.save(reservationModel);
        PaiementModel paiementModel=new PaiementModel();
        paiementModel.setNbJour(NbDays);
        paiementModel.setReservation(reservationModel);
        paiementModel.setPrice(montant*NbDays);
        paiementModel.setStatut("PAYER");
        paiementModel.setMethode(modePaiement);
        paiementModel.setDatePaiement(LocalDate.now());


        return paiementRepository.save(paiementModel);
    }

    public List<PaiementModel> paiementList(){
        return paiementRepository.findAll();
    }
    public ResponseEntity<String> deletePaiement(Long id,Long idU){
        PaiementModel paiementModel=paiementRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("paiement not found"));
        histService.AjoutHistorique("Suppression de paiement pour: "+paiementModel.getReservation().getClient().getPrenom(),idU);
        notificationService.createNotification(paiementModel.getReservation().getClient().getId(),"Paiement annuler pour: "+paiementModel.getReservation().getClient().getPrenom());
        ReservationModel resq=resRepository.findById(paiementModel.getReservation().getId()).orElseThrow();
        resq.setStatut("EN_ATTENTE");
        resRepository.save(resq);
        paiementRepository.deleteById(id);
        return ResponseEntity.ok().body("Paiements deleted successfully");
    }
    public PaiementModel UpdatePaiement(Long id,Long reservationID,String modePaiement,String statut) {
        PaiementModel paiementModel=paiementRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("paiement not found"));
        ReservationModel resq=resRepository.findById(paiementModel.getReservation().getId()).orElseThrow();
        resq.setStatut("EN_ATTENTE");
        resRepository.save(resq);
        ReservationModel reservationModel=resRepository.findById(reservationID)
                .orElseThrow(()-> new RuntimeException("reservation not found"));
        reservationModel.setStatut(statut);
        resRepository.save(reservationModel);
        paiementModel.setReservation(reservationModel);
        paiementModel.setMethode(modePaiement);
        paiementModel.setStatut(statut);
        return paiementRepository.save(paiementModel);

    }
    public  List<Map<String,Object>> getPaiementListByDay(){
        return paiementRepository.findPaiementByDay();
    }
}

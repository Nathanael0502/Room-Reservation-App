package org.example.backapp.Reservation.Controller;


import jakarta.mail.MessagingException;
import org.example.backapp.Reservation.Model.ReservationModel;
import org.example.backapp.Reservation.Service.ReservationService;

import org.example.backapp.Reservation.repository.reservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("api/reservation")
public class ReservationController {
    @Autowired
    private org.example.backapp.Reservation.repository.reservationRepository resp;
    @Autowired
    private ReservationService reservationService;
    @Autowired
    private org.example.backapp.Reservation.repository.reservationRepository reservationRepository;

    @PostMapping("/reserver")
    public ReservationModel reserver(
            @RequestParam Long clientId,
            @RequestParam Long chambreId,
            @RequestParam LocalDate debut,
            @RequestParam LocalDate fin
    ) throws MessagingException {
        return reservationService.reserver(clientId,chambreId, debut, fin);
    }


    @GetMapping("/Liste")
    public List<ReservationModel> liste(){
        return reservationService.getReservation();
    }
@PutMapping("/confirmation/{id}")
    public ReservationModel confirmation(
            @PathVariable Long id,
            @RequestParam String statut
){
        return reservationService.Confirmation(id,statut);
}

@PutMapping("/modifier/{id}")
    public ReservationModel updateReserv(
            @PathVariable Long id,
            @RequestParam Long clientId,
            @RequestParam Long chambreId,
            @RequestParam LocalDate debut,
            @RequestParam LocalDate fin
){
        return reservationService.ModifierReservation(id,clientId,chambreId,debut,fin);
}

@DeleteMapping("/supprimer/{id}")
    public List<ReservationModel> supprimer(@PathVariable Long id){
         reservationService.deleteReservation(id);
    return  reservationRepository.findAll();
}
@GetMapping("/reservationCli")
    public List<ReservationModel> getReservationCli(){
        return reservationRepository.findByConfirmation(true);
}
@GetMapping("/confirmer/{id}")
    public ReservationModel confirmReservation(@PathVariable Long id) throws MessagingException {
        return reservationService.confirmReservation(id);
}
}

package org.example.backapp.Reservation.Controller;

import org.example.backapp.Reservation.repository.reservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class ChambreSchelduler {
    @Autowired
    private reservationRepository resp;

    @Scheduled(fixedRate = 1000)
    public void chambreSchelduler() {
       // resp.libereChambre(LocalDate.now());
    }

}

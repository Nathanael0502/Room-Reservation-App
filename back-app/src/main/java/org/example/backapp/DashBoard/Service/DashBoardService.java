package org.example.backapp.DashBoard.Service;

import org.example.backapp.DashBoard.Repository.dashBoardRepository;
import org.example.backapp.Reservation.Model.ReservationModel;
import org.example.backapp.Reservation.repository.reservationRepository;
import org.example.backapp.chambre.repository.ChambreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DashBoardService {
    @Autowired
    private dashBoardRepository paiementRepository;
    @Autowired
    private org.example.backapp.Client.repository.clientRepository clientRepository;
@Autowired
private ChambreRepository chambreRepository;
@Autowired
private reservationRepository resRepository;
    public Double getTotalPaiement() {
        return paiementRepository.getTotalPrice();
    }
    public Long getCountUsers(){
        return clientRepository.getCount();
    }
    public Long getCountRooms(){
        return chambreRepository.countChambre();
    }
    public Long getCountReservation(){
        return resRepository.getTotalReservations();
    }
    public Long ReservationToday(){
        return resRepository.getTotalReservationsToday(LocalDate.now());
    }
    public List<ReservationModel> ReservationTodayList(){
        return resRepository.getReservationsToday(LocalDate.now());
    }
    }

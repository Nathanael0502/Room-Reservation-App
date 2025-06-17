package org.example.backapp.paiement.model;

import jakarta.persistence.*;
import org.example.backapp.Reservation.Model.ReservationModel;

import java.time.LocalDate;

@Entity
@Table(name="Paiement")
public class PaiementModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name="reservation_id", nullable=false)
    private ReservationModel reservation;

    private double price;
    private String methode;
    private String statut;
    private LocalDate DatePaiement;
    private Long nbJour;

    public LocalDate getDatePaiement() {
        return DatePaiement;
    }
    public void setDatePaiement(LocalDate DatePaiement) {
        this.DatePaiement = DatePaiement;
    }

    public Long getId() {
        return id;
    }

    public ReservationModel getReservation() {
        return reservation;
    }

    public double getPrice() {
        return price;
    }

    public String getMethode() {
        return methode;
    }

    public String getStatut() {
        return statut;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setReservation(ReservationModel reservation) {
        this.reservation = reservation;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setMethode(String methode) {
        this.methode = methode;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public Long getNbJour() {
        return nbJour;
    }

    public void setNbJour(Long nbJour) {
        this.nbJour = nbJour;
    }
}

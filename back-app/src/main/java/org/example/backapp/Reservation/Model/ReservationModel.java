package org.example.backapp.Reservation.Model;

import jakarta.persistence.*;
import org.example.backapp.Client.model.ClientModel;
import org.example.backapp.chambre.model.Chambre;

import java.time.LocalDate;

@Entity
@Table(name = "reservations")
public class ReservationModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private ClientModel client;

    @ManyToOne
    @JoinColumn(name="chambre_id")
    private Chambre chambre;
    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private boolean confirmation=false;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private String statut;

    public boolean isConfirmation() {
        return confirmation;
    }

    public void setConfirmation(boolean confirmation) {
        this.confirmation = confirmation;
    }

    public long getId() {
        return id;
    }

    public ClientModel getClient() {
        return client;
    }

    public Chambre getChambre() {
        return chambre;
    }

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public LocalDate getDateFin() {
        return dateFin;
    }

    public String getStatut() {
        return statut;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setClient(ClientModel client) {
        this.client = client;
    }

    public void setChambre(Chambre chambre) {
        this.chambre = chambre;
    }

    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }

    public void setDateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }
}

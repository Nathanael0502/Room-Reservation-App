package org.example.backapp.notes.Model;

import jakarta.persistence.*;
import org.example.backapp.Client.model.ClientModel;
import org.example.backapp.chambre.model.Chambre;

@Entity
@Table(name = "Notes")
public class NoteModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String notes;
    @ManyToOne
    @JoinColumn(name = "client_id")
    private ClientModel client;
    @ManyToOne
    @JoinColumn(name="chambre_id")
    private Chambre chambre;
    private int nbStars=0;

    public int getNbStars() {
        return nbStars;
    }
    public void setNbStars(int nbStars) {
        this.nbStars = nbStars;
    }
    public int getId() {
        return id;
    }

    public String getNotes() {
        return notes;
    }

    public ClientModel getClient() {
        return client;
    }

    public Chambre getChambre() {
        return chambre;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public void setClient(ClientModel client) {
        this.client = client;
    }

    public void setChambre(Chambre chambre) {
        this.chambre = chambre;
    }
}

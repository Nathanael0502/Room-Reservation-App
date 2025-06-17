package org.example.backapp.Stars.Model;

import jakarta.persistence.*;
import org.example.backapp.Client.model.ClientModel;
import org.example.backapp.chambre.model.Chambre;

@Entity
@Table(name="Stars")
public class StarsModel {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;
    private int stars;
    @ManyToOne
    @JoinColumn(name = "client_id")
    private ClientModel client;
    @ManyToOne
    @JoinColumn(name = "chambre_id")
    private Chambre chambre;

    public Long getId() {
        return id;
    }

    public int getStars() {
        return stars;
    }

    public ClientModel getClient() {
        return client;
    }

    public Chambre getChambre() {
        return chambre;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setStars(int stars) {
        this.stars = stars;
    }

    public void setClient(ClientModel client) {
        this.client = client;
    }

    public void setChambre(Chambre chambre) {
        this.chambre = chambre;
    }
}

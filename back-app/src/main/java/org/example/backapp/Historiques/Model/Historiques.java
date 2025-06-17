package org.example.backapp.Historiques.Model;

import jakarta.persistence.*;
import org.example.backapp.Client.model.ClientModel;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;


@Entity
@Table(name = "Hitsoriques")
public class Historiques {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String historique;
    @CreationTimestamp
    @Column(name = "date_insertion",nullable = false,updatable = false)
    private LocalDateTime dateInsertion;
    @ManyToOne
    @JoinColumn(name = "client_id")
    private ClientModel client;

    public ClientModel getClient() {
        return client;
    }

    public void setClient(ClientModel client) {
        this.client = client;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setHistorique(String historique) {
        this.historique = historique;
    }

    public void setDateInsertion(LocalDateTime dateInsertion) {
        this.dateInsertion = dateInsertion;
    }

    public Long getId() {
        return id;
    }

    public String getHistorique() {
        return historique;
    }

    public LocalDateTime getDateInsertion() {
        return dateInsertion;
    }
}

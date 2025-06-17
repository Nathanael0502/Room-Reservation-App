package org.example.backapp.chambre.model;

import jakarta.persistence.*;

@Entity
@Table(name="Chambre")
public class Chambre {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private String numero;
    private String type;
    private double prix;
    private boolean disponible;
    private String imagePath;


    public Long getId() {
        return id;
    }

    public String getNumero() {
        return numero;
    }

    public String getType() {
        return type;
    }

    public double getPrix() {
        return prix;
    }

    public boolean isDisponible() {
        return disponible;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setPrix(double prix) {
        this.prix = prix;
    }

    public void setDisponible(boolean disponible) {
        this.disponible = disponible;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
}

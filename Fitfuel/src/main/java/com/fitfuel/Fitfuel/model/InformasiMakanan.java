package com.fitfuel.Fitfuel.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class InformasiMakanan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // ID unik
    private String namaMakanan;
    private double kaloriPerPorsi;
    private double porsi;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNamaMakanan() {
        return namaMakanan;
    }

    public void setNamaMakanan(String namaMakanan) {
        this.namaMakanan = namaMakanan;
    }

    public double getKaloriPerPorsi() {
        return kaloriPerPorsi;
    }

    public void setKaloriPerPorsi(double kaloriPerPorsi) {
        this.kaloriPerPorsi = kaloriPerPorsi;
    }

    public double getPorsi() {
        return porsi;
    }

    public void setPorsi(double porsi) {
        this.porsi = porsi;
    }
}
package com.fitfuel.Fitfuel.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;

@Entity
public class ProfilPengguna {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // ID unik
    @Column(unique = true, nullable = false)
    private String username; // Username sebagai ID unik
    private double tinggiBadan;
    private double beratBadan;
    private int targetKaloriHarian;

    // Method untuk menampilkan profil
    public String tampilkanProfil() {
        return "Tinggi: " + tinggiBadan + ", Berat: " + beratBadan + ", Target Kalori Harian: " + targetKaloriHarian;
    }

    // Method untuk mengupdate profil
    public void updateProfil(double tinggi, double berat) {
        this.tinggiBadan = tinggi;
        this.beratBadan = berat;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public double getTinggiBadan() {
        return tinggiBadan;
    }

    public void setTinggiBadan(double tinggiBadan) {
        this.tinggiBadan = tinggiBadan;
    }

    public double getBeratBadan() {
        return beratBadan;
    }

    public void setBeratBadan(double beratBadan) {
        this.beratBadan = beratBadan;
    }

    public int getTargetKaloriHarian() {
        return targetKaloriHarian;
    }

    public void setTargetKaloriHarian(int targetKaloriHarian) {
        this.targetKaloriHarian = targetKaloriHarian;
    }
}
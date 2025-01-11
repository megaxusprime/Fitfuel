package com.fitfuel.Fitfuel.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class AsupanKalori implements Asupan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // ID unik

    private LocalDateTime createdAt; // Waktu pencatatan
    private LocalDateTime tanggal; // Waktu konsumsi makanan
    private String makanan;
    private double kalori;
    private double jumlah;

    @ManyToOne
    @JoinColumn(name = "pengguna_id", nullable = false) // Foreign key
    private Pengguna pengguna;

    // Konstruktor
    public AsupanKalori() {
        this.createdAt = LocalDateTime.now(); // Otomatis set waktu saat objek dibuat
    }

    public AsupanKalori(LocalDateTime tanggal, String makanan, double kalori, double jumlah, Pengguna pengguna) {
        this.createdAt = LocalDateTime.now(); // Waktu pencatatan
        this.tanggal = tanggal;
        this.makanan = makanan;
        this.kalori = kalori;
        this.jumlah = jumlah;
        this.pengguna = pengguna; // Set pengguna
    }

    // Implementasi method dari interface Asupan
    @Override
    public List<AsupanKalori> getRiwayatAsupan() {
        // Logika untuk mendapatkan riwayat asupan (dummy)
        return null;
    }

    @Override
    public float hitungTotalKalori() {
        return (float) (kalori * jumlah);
    }

    @Override
    public void catatAsupan() {
        // Logika untuk mencatat asupan (dummy)
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getTanggal() {
        return tanggal;
    }

    public void setTanggal(LocalDateTime tanggal) {
        this.tanggal = tanggal;
    }

    public String getMakanan() {
        return makanan;
    }

    public void setMakanan(String makanan) {
        this.makanan = makanan;
    }

    public double getKalori() {
        return kalori;
    }

    public void setKalori(double kalori) {
        this.kalori = kalori;
    }

    public double getJumlah() {
        return jumlah;
    }

    public void setJumlah(double jumlah) {
        this.jumlah = jumlah;
    }

    public Pengguna getPengguna() {
        return pengguna;
    }

    public void setPengguna(Pengguna pengguna) {
        this.pengguna = pengguna;
    }
}

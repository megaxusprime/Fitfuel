package com.fitfuel.Fitfuel.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.util.Date;
import java.util.List;

@Entity
public class AsupanKalori implements Asupan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // ID unik
    private Date tanggal;
    private String makanan;
    private double kalori;
    private double jumlah;

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
    public Date getTanggal() {
        return tanggal;
    }

    public void setTanggal(Date tanggal) {
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
}
package com.fitfuel.Fitfuel.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.List;

@Entity
public class ResepRekomendasiMakanan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // ID unik
    private String namaResep;
    private String langkahPembuatan;

    // Method untuk mendapatkan resep
    public String getResep() {
        return namaResep + ": " + langkahPembuatan;
    }

    // Method untuk memberikan rekomendasi makanan berdasarkan target kalori
    public List<InformasiMakanan> rekomendasiMakanan(double targetKalori) {
        // Logika untuk rekomendasi makanan (dummy)
        return null;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNamaResep() {
        return namaResep;
    }

    public void setNamaResep(String namaResep) {
        this.namaResep = namaResep;
    }

    public String getLangkahPembuatan() {
        return langkahPembuatan;
    }

    public void setLangkahPembuatan(String langkahPembuatan) {
        this.langkahPembuatan = langkahPembuatan;
    }
}
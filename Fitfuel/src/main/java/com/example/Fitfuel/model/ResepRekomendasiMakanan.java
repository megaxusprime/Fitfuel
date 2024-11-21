/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.tubes_pbo_impal;

/**
 *
 * @author ASUS
 */
import java.util.List;

public class ResepRekomendasiMakanan {

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


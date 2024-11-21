/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.tubes_pbo_impal;

/**
 *
 * @author ASUS
 */
import java.util.Date;
import java.util.List;

public class AsupanKalori implements Asupan {

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


/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.tubes_pbo_impal;

/**
 *
 * @author ASUS
 */
public class ProfilPengguna {

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

    // Method untuk membuat laporan kesehatan
    public String laporanKesehatan() {
        return "Berat: " + beratBadan + ", Tinggi: " + tinggiBadan + ", Target Kalori: " + targetKaloriHarian;
    }

    // Getters and Setters
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


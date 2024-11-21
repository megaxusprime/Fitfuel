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

public class Pengguna {

    private String username;
    private String namaPengguna;
    private String email;
    private String password;

    // Relasi ke Profil Pengguna
    private ProfilPengguna profil;

    // Relasi ke TimelinePengguna
    private List<TimelinePengguna> timeline;

    // Constructor
    public Pengguna() {}

    public Pengguna(String username, String namaPengguna, String email, String password, ProfilPengguna profil) {
        this.username = username;
        this.namaPengguna = namaPengguna;
        this.email = email;
        this.password = password;
        this.profil = profil;
    }

    // Method untuk mengupdate profil
    public void updateProfil(ProfilPengguna profilBaru) {
        this.profil = profilBaru;
    }

    // Method untuk menambah TimelinePengguna
    public void tambahTimeline(TimelinePengguna timelineBaru) {
        this.timeline.add(timelineBaru);
    }

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getNamaPengguna() {
        return namaPengguna;
    }

    public void setNamaPengguna(String namaPengguna) {
        this.namaPengguna = namaPengguna;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public ProfilPengguna getProfil() {
        return profil;
    }

    public void setProfil(ProfilPengguna profil) {
        this.profil = profil;
    }

    public List<TimelinePengguna> getTimeline() {
        return timeline;
    }

    public void setTimeline(List<TimelinePengguna> timeline) {
        this.timeline = timeline;
    }
}


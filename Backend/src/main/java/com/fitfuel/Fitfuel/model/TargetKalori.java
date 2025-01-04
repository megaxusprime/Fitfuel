package com.fitfuel.Fitfuel.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.util.Date;

@Entity
public class TargetKalori {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String username; // Hubungkan dengan pengguna

    @NotNull
    private int targetKalori;

    @Temporal(TemporalType.DATE)
    private Date tanggal;

    private boolean achieveKalori;

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getTargetKalori() {
        return targetKalori;
    }

    public void setTargetKalori(int targetKalori) {
        this.targetKalori = targetKalori;
    }

    public Date getTanggal() {
        return tanggal;
    }

    public void setTanggal(Date tanggal) {
        this.tanggal = tanggal;
    }

    public boolean isAchieveKalori() {
        return achieveKalori;
    }

    public void setAchieveKalori(boolean achieveKalori) {
        this.achieveKalori = achieveKalori;
    }
}

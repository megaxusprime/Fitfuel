package com.fitfuel.Fitfuel.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Date;

@Entity
public class TargetKalori {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // ID unik
    private int targetKalori;
    private Date tanggal;
    private boolean achieveKalori;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
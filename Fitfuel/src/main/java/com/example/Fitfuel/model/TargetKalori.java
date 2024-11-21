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

public class TargetKalori {

    private int targetKalori;
    private Date tanggal;
    private boolean achieveKalori;

    // Getters and Setters
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


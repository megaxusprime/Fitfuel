package com.fitfuel.Fitfuel.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class TimelinePengguna {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.TIMESTAMP) // Pastikan format tanggal sesuai
    private Date tanggal;

    @Column(nullable = false) // Wajib diisi
    private String catatanKemajuan;

    private double beratBadan;

    // Getters dan Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getTanggal() {
        return tanggal;
    }

    public void setTanggal(Date tanggal) {
        this.tanggal = tanggal;
    }

    public double getBeratBadan() {
        return beratBadan;
    }

    public void setBeratBadan(double beratBadan) {
        this.beratBadan = beratBadan;
    }

    public String getCatatanKemajuan() {
        return catatanKemajuan;
    }

    public void setCatatanKemajuan(String catatanKemajuan) {
        this.catatanKemajuan = catatanKemajuan;
    }
}

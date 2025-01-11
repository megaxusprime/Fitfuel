package com.fitfuel.Fitfuel.model;

import jakarta.persistence.*;
import java.util.Objects;

@Entity
public class RekomendasiMakanan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String namaMakanan;

    @Column(nullable = false)
    private int kalori;

    @Column(nullable = true)
    private String kategori; // Misalnya: Sarapan, Makan Siang, Camilan, dll.

    @Column(nullable = true)
    private String deskripsi; // Informasi tambahan tentang makanan

    @Column(nullable = true)
    private String namaResep; // Nama resep (baru)

    @Column(nullable = true, length = 1000)
    private String langkahPembuatan; // Langkah pembuatan (baru)

    // Getter dan Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNamaMakanan() {
        return namaMakanan;
    }

    public void setNamaMakanan(String namaMakanan) {
        this.namaMakanan = namaMakanan;
    }

    public int getKalori() {
        return kalori;
    }

    public void setKalori(int kalori) {
        this.kalori = kalori;
    }

    public String getKategori() {
        return kategori;
    }

    public void setKategori(String kategori) {
        this.kategori = kategori;
    }

    public String getDeskripsi() {
        return deskripsi;
    }

    public void setDeskripsi(String deskripsi) {
        this.deskripsi = deskripsi;
    }

    public String getNamaResep() { // Getter untuk namaResep
        return namaResep;
    }

    public void setNamaResep(String namaResep) { // Setter untuk namaResep
        this.namaResep = namaResep;
    }

    public String getLangkahPembuatan() { // Getter untuk langkahPembuatan
        return langkahPembuatan;
    }

    public void setLangkahPembuatan(String langkahPembuatan) { // Setter untuk langkahPembuatan
        this.langkahPembuatan = langkahPembuatan;
    }

    // Metode untuk menggabungkan informasi resep
    public String getResep() {
        return "Nama Resep: " + namaResep + "\nLangkah Pembuatan:\n" + langkahPembuatan;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RekomendasiMakanan that = (RekomendasiMakanan) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}

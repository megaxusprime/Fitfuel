package com.fitfuel.Fitfuel.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Postingan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // ID unik
    private String konten; // Konten dari postingan
    private String gambar; // URL atau path gambar

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Komentar> komentar; // Daftar komentar pada postingan

    // Method untuk membuat postingan
    public void buatPostingan(String konten, String gambar) {
        this.konten = konten;
        this.gambar = gambar;
    }

    // Method untuk menghapus postingan
    public void hapusPostingan() {
        this.konten = null;
        this.gambar = null;
        if (this.komentar != null) {
            this.komentar.clear();
        }
    }

    // Getters dan Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKonten() {
        return konten;
    }

    public void setKonten(String konten) {
        this.konten = konten;
    }

    public String getGambar() {
        return gambar;
    }

    public void setGambar(String gambar) {
        this.gambar = gambar;
    }

    public List<Komentar> getKomentar() {
        return komentar;
    }

    public void setKomentar(List<Komentar> komentar) {
        this.komentar = komentar;
    }
}

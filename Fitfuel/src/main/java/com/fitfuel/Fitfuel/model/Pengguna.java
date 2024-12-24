package com.fitfuel.Fitfuel.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import java.util.List;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Pengguna {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // ID unik
    @NotBlank(message = "Username is mandatory")
    private String username;
    private String namaPengguna;
    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email should be valid")
    private String email;
    @NotBlank(message = "Password is mandatory")
    private String password;

    @OneToOne(cascade = CascadeType.ALL)
    private ProfilPengguna profil;

    @OneToMany(cascade = CascadeType.ALL)
    private List<TimelinePengguna> timeline;

    // Constructor
    public Pengguna() {}

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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
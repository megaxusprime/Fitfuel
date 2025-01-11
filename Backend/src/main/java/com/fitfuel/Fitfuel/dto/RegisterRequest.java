package com.fitfuel.Fitfuel.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public class RegisterRequest {

    @NotEmpty(message = "Email tidak boleh kosong")
    @Email(message = "Format email tidak valid")
    private String email;

    @NotEmpty(message = "Password tidak boleh kosong")
    @Size(min = 8, message = "Password harus minimal 8 karakter")
    private String password;

    @NotEmpty(message = "Username tidak boleh kosong")
    private String username;

    @NotEmpty(message = "Nama Pengguna tidak boleh kosong")
    private String namaPengguna;

    // Getters dan Setters
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
}
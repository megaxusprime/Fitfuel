package com.fitfuel.Fitfuel.dto; // Simpan di package ini

public class RegisterRequest {

    private String email;
    private String password;

    // Getter dan Setter
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
}


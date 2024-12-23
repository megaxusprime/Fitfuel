package com.fitfuel.Fitfuel.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordEncryptor {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        // Masukkan password plaintext yang ingin dienkripsi
        String[] plaintextPasswords = {"alfi.123", "Tripagno.11", "securepassword"};

        System.out.println("Hasil Enkripsi:");
        for (String plaintext : plaintextPasswords) {
            String hashedPassword = encoder.encode(plaintext);
            System.out.println("Password: " + plaintext + " -> " + hashedPassword);
        }
    }
}

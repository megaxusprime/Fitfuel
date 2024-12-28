package com.fitfuel.Fitfuel.controller;

import java.util.List;
import java.util.Map;

import com.fitfuel.Fitfuel.dto.LoginRequest;
import com.fitfuel.Fitfuel.dto.RegisterRequest;
import com.fitfuel.Fitfuel.model.Pengguna;
import com.fitfuel.Fitfuel.model.ProfilPengguna;
import com.fitfuel.Fitfuel.model.TimelinePengguna;
import com.fitfuel.Fitfuel.repository.PenggunaRepository;
import com.fitfuel.Fitfuel.service.PenggunaService;
import com.fitfuel.Fitfuel.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pengguna")
public class PenggunaController {

    @Autowired
    private PenggunaService penggunaService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PenggunaRepository penggunaRepository;

    @PostMapping("/pengguna")
    Pengguna newPengguna(@RequestBody Pengguna newPengguna){
        return penggunaRepository.save(newPengguna);
    }

    @GetMapping("/ppengguna")
    List<Pengguna> getAllUsers(){
        return penggunaRepository.findAll();
    }

    // Register Endpoint
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        try {
            System.out.println("Email: " + registerRequest.getEmail());
            System.out.println("Password: " + registerRequest.getPassword());
            System.out.println("Username: " + registerRequest.getUsername());
            System.out.println("Nama Pengguna: " + registerRequest.getNamaPengguna());

            // Tambahkan validasi
            if (registerRequest.getUsername() == null || registerRequest.getUsername().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username tidak boleh kosong");
            }
            if (registerRequest.getNamaPengguna() == null || registerRequest.getNamaPengguna().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nama Pengguna tidak boleh kosong");
            }

            // Gunakan service untuk menyimpan pengguna
            penggunaService.tambahPengguna(registerRequest);
            return ResponseEntity.ok("Pengguna berhasil ditambahkan");
        } catch (IllegalArgumentException e) {
            System.err.println("Error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace(); // Debugging stack trace
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Gagal menambahkan pengguna");
        }
    }


    // Login Endpoint
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        System.out.println("Email diterima: " + loginRequest.getEmail());
        System.out.println("Password diterima: " + loginRequest.getPassword());

        if (penggunaService.isValidUser(loginRequest.getEmail(), loginRequest.getPassword())) {
            System.out.println("Login berhasil");
            return ResponseEntity.ok(Map.of("message", "Login berhasil"));
        } else {
            System.out.println("Login gagal: Invalid credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid credentials"));
        }
    }



    @GetMapping
    public String defaultMapping() {
        return "Endpoint Pengguna: Gunakan /register atau /login untuk akses.";
    }

    // Profil
    @GetMapping("/{username}/profil")
    public ResponseEntity<ProfilPengguna> getProfil(@PathVariable String username) {
        Pengguna pengguna = penggunaRepository.findByUsername(username);
        if (pengguna != null) {
            return ResponseEntity.ok(pengguna.getProfil());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @PutMapping("/{username}/profil")
    public ResponseEntity<String> updateProfil(@PathVariable String username, @RequestBody ProfilPengguna updatedProfil) {
        Pengguna pengguna = penggunaRepository.findByUsername(username);
        if (pengguna != null) {
            ProfilPengguna profil = pengguna.getProfil();
            profil.updateProfil(updatedProfil.getTinggiBadan(), updatedProfil.getBeratBadan());
            penggunaRepository.save(pengguna);
            return ResponseEntity.ok("Profil berhasil diperbarui!");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pengguna tidak ditemukan!");
    }

    // Timeline
    @PostMapping("/{username}/timeline")
    public ResponseEntity<String> addTimeline(@PathVariable String username, @RequestBody TimelinePengguna timelinePengguna) {
        Pengguna pengguna = penggunaRepository.findByUsername(username);
        if (pengguna != null) {
            pengguna.getTimeline().add(timelinePengguna);
            penggunaRepository.save(pengguna);
            return ResponseEntity.ok("Timeline berhasil ditambahkan!");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pengguna tidak ditemukan!");
    }

    public static class AuthenticationResponse {
        private String jwt;

        public AuthenticationResponse(String jwt) {
            this.jwt = jwt;
        }

        public String getJwt() {
            return jwt;
        }

        public void setJwt(String jwt) {
            this.jwt = jwt;
        }
    }
}

package com.fitfuel.Fitfuel.controller;

import java.util.List;
import java.util.Map;

import com.fitfuel.Fitfuel.model.Pengguna;
import com.fitfuel.Fitfuel.model.ProfilPengguna;
import com.fitfuel.Fitfuel.model.TimelinePengguna;
import com.fitfuel.Fitfuel.repository.PenggunaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pengguna")
public class PenggunaController {

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
    public ResponseEntity<String> registerUser(@RequestBody Pengguna pengguna) {
        if (penggunaRepository.existsByUsername(pengguna.getUsername())) {
            return ResponseEntity.badRequest().body("Username already exists!");
        }
        penggunaRepository.save(pengguna);
        return ResponseEntity.ok("User registered successfully!");
    }

    // Login Endpoint
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");

        Pengguna pengguna = penggunaRepository.findByUsername(username);
        if (pengguna != null && pengguna.getPassword().equals(password)) {
            return ResponseEntity.ok("Login successful!");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password!");
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
}

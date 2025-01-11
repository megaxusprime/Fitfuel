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
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;


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
    public Pengguna newPengguna(@RequestBody Pengguna newPengguna) {
        return penggunaRepository.save(newPengguna);
    }

    @GetMapping("/ppengguna")
    public List<Pengguna> getAllUsers() {
        return penggunaRepository.findAll();
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        try {
            // Validasi semua field
            if (registerRequest.getUsername() == null || registerRequest.getUsername().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                        "field", "username",
                        "message", "Username tidak boleh kosong"
                ));
            }
            if (registerRequest.getNamaPengguna() == null || registerRequest.getNamaPengguna().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                        "field", "namaPengguna",
                        "message", "Nama Pengguna tidak boleh kosong"
                ));
            }
            if (registerRequest.getEmail() == null || registerRequest.getEmail().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                        "field", "email",
                        "message", "Email tidak boleh kosong"
                ));
            }
            if (registerRequest.getPassword() == null || registerRequest.getPassword().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                        "field", "password",
                        "message", "Password tidak boleh kosong"
                ));
            }

            // Gunakan service untuk menyimpan pengguna
            penggunaService.tambahPengguna(registerRequest);
            return ResponseEntity.ok(Map.of("message", "Pengguna berhasil ditambahkan"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "message", "Gagal menambahkan pengguna. Silakan coba lagi."
            ));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        if (penggunaService.isValidUser(loginRequest.getEmail(), loginRequest.getPassword())) {
            String username = penggunaService.getUsernameByEmail(loginRequest.getEmail());
            String token = jwtUtil.generateToken(username);
            return ResponseEntity.ok(Map.of(
                    "message", "Login berhasil",
                    "token", token,
                    "username", username
            ));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid credentials"));
        }
    }

    @PostMapping("/profil")
    public ResponseEntity<?> updateProfil(@RequestBody @Valid ProfilPengguna updatedProfil, HttpServletRequest request) {
        String username = (String) request.getAttribute("username");
        if (username == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Token tidak valid atau pengguna tidak ditemukan"));
        }

        Pengguna pengguna = penggunaRepository.findByUsername(username);
        if (pengguna == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Pengguna tidak ditemukan"));
        }

        if (updatedProfil.getTinggiBadan() <= 0 || updatedProfil.getBeratBadan() <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Tinggi badan dan berat badan harus lebih besar dari 0"));
        }

        pengguna.getProfil().updateProfil(updatedProfil.getTinggiBadan(), updatedProfil.getBeratBadan());
        penggunaRepository.save(pengguna);
        return ResponseEntity.ok("Profil berhasil diperbarui");
    }

    @GetMapping("/profil")
    public ResponseEntity<?> getProfil(HttpServletRequest request) {
        String username = (String) request.getAttribute("username");
        if (username == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "message", "Token tidak valid atau pengguna tidak ditemukan"
            ));
        }

        Pengguna pengguna = penggunaRepository.findByUsername(username);
        if (pengguna == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                    "message", "Pengguna tidak ditemukan"
            ));
        }

        return ResponseEntity.ok(Map.of(
                "id", pengguna.getId(),
                "username", pengguna.getUsername(),
                "email", pengguna.getEmail(),
                "name", pengguna.getNamaPengguna()
        ));
    }

    @PutMapping("/profil")
    public ResponseEntity<?> updateProfil(@RequestBody Map<String, String> updatedData, HttpServletRequest request) {
        String username = (String) request.getAttribute("username");
        if (username == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "message", "Token tidak valid atau pengguna tidak ditemukan"
            ));
        }

        Pengguna pengguna = penggunaRepository.findByUsername(username);
        if (pengguna == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                    "message", "Pengguna tidak ditemukan"
            ));
        }

        String namaPenggunaBaru = updatedData.get("name");
        String emailBaru = updatedData.get("email");

        if (namaPenggunaBaru != null && !namaPenggunaBaru.isEmpty()) {
            pengguna.setNamaPengguna(namaPenggunaBaru);
        }
        if (emailBaru != null && !emailBaru.isEmpty()) {
            pengguna.setEmail(emailBaru);
        }

        penggunaRepository.save(pengguna);

        return ResponseEntity.ok(Map.of("message", "Profil berhasil diperbarui"));
    }

    @PostMapping("/timeline")
    public ResponseEntity<String> addTimeline(@RequestBody TimelinePengguna timelinePengguna, HttpServletRequest request) {
        String username = (String) request.getAttribute("username");
        Pengguna pengguna = penggunaRepository.findByUsername(username);
        if (pengguna != null) {
            pengguna.getTimeline().add(timelinePengguna);
            penggunaRepository.save(pengguna);
            return ResponseEntity.ok("Timeline berhasil ditambahkan!");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pengguna tidak ditemukan!");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader(value = "Authorization", required = false) String token) {
        if (token != null && !token.isEmpty()) {
            if (!token.startsWith("Bearer ")) {
                return ResponseEntity.badRequest().body(Map.of("message", "Token tidak valid"));
            }
        }
        return ResponseEntity.ok(Map.of("message", "Logout berhasil"));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteAccount(HttpServletRequest request) {
        String username = (String) request.getAttribute("username");

        // Validasi token dan pengguna
        if (username == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token tidak valid atau pengguna tidak ditemukan");
        }

        Pengguna pengguna = penggunaRepository.findByUsername(username);
        if (pengguna == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pengguna tidak ditemukan");
        }

        // Hapus pengguna
        penggunaRepository.delete(pengguna);
        return ResponseEntity.ok("Akun berhasil dihapus");
    }
}

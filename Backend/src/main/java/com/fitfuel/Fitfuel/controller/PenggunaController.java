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
        } catch (IllegalArgumentException e) {
            System.err.println("Error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                    "message", e.getMessage()
            ));
        } catch (Exception e) {
            e.printStackTrace(); // Debugging stack trace
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "message", "Gagal menambahkan pengguna. Silakan coba lagi."
            ));
        }
    }




    // Login Endpoint
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // Validasi email dan password
        if (penggunaService.isValidUser(loginRequest.getEmail(), loginRequest.getPassword())) {
            // Ambil username berdasarkan email
            String username = penggunaService.getUsernameByEmail(loginRequest.getEmail());

            // Buat token JWT
            String token = jwtUtil.generateToken(username);
            // Kembalikan token ke client
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





    @GetMapping
    public String defaultMapping() {
        return "Endpoint Pengguna: Gunakan /register atau /login untuk akses.";
    }

    // Profil
    @GetMapping("/profil")
    public ResponseEntity<?> getProfil( HttpServletRequest request) {
        return ResponseEntity.ok(request.getAttribute("user")); //Contoh pengambilan user
    }



    @PutMapping("/profil")
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
    @PostMapping("/timeline")
    public ResponseEntity<String> addTimeline(@PathVariable String username, @RequestBody TimelinePengguna timelinePengguna) {
        Pengguna pengguna = penggunaRepository.findByUsername(username);
        if (pengguna != null) {
            pengguna.getTimeline().add(timelinePengguna);
            penggunaRepository.save(pengguna);
            return ResponseEntity.ok("Timeline berhasil ditambahkan!");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pengguna tidak ditemukan!");
    }

    // Logout Endpoint
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader(value = "Authorization", required = false) String token) {
        try {
            if (token != null && !token.isEmpty()) {
                // Validasi format token (opsional)
                if (!token.startsWith("Bearer ")) {
                    return ResponseEntity.badRequest().body(Map.of(
                            "message", "Token tidak valid"
                    ));
                }

                // Log token untuk debugging (hapus di produksi)
                System.out.println("Token yang diterima untuk logout: " + token);

                // Logika blacklist token (opsional)
                // Tambahkan token ke blacklist jika backend mendukung
            } else {
                // Tangani kasus token kosong
                System.out.println("Token tidak ada atau kosong.");
            }

            // Respons sukses meskipun token kosong atau tidak valid
            return ResponseEntity.ok(Map.of("message", "Logout berhasil"));
        } catch (Exception e) {
            // Log kesalahan untuk debugging
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "message", "Terjadi kesalahan saat logout"
            ));
        }
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

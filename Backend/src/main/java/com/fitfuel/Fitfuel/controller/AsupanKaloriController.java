package com.fitfuel.Fitfuel.controller;

import com.fitfuel.Fitfuel.model.AsupanKalori;
import com.fitfuel.Fitfuel.model.Pengguna;
import com.fitfuel.Fitfuel.repository.AsupanKaloriRepository;
import com.fitfuel.Fitfuel.repository.PenggunaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

@RestController
@RequestMapping("/api/asupan")
public class AsupanKaloriController {

    @Autowired
    private AsupanKaloriRepository asupanKaloriRepository;

    @Autowired
    private PenggunaRepository penggunaRepository;

    // Input Asupan Kalori
    @PostMapping
    public ResponseEntity<?> inputAsupan(@RequestBody AsupanKalori asupanKalori, HttpServletRequest request) {
        String username = (String) request.getAttribute("username");
        Pengguna pengguna = penggunaRepository.findByUsername(username);

        if (pengguna == null) {
            return ResponseEntity.status(401).body("Pengguna tidak ditemukan");
        }

        // Kaitkan asupan kalori dengan pengguna
        asupanKalori.setPengguna(pengguna);

        // Simpan asupan kalori
        AsupanKalori savedAsupan = asupanKaloriRepository.save(asupanKalori);
        return ResponseEntity.ok(savedAsupan);
    }

    // Lihat Riwayat Asupan Kalori
    @GetMapping
    public ResponseEntity<?> getRiwayatAsupan(HttpServletRequest request) {
        String username = (String) request.getAttribute("username");
        Pengguna pengguna = penggunaRepository.findByUsername(username);

        if (pengguna == null) {
            return ResponseEntity.status(401).body("Pengguna tidak ditemukan");
        }

        List<AsupanKalori> riwayat = asupanKaloriRepository.findByPengguna(pengguna);
        return ResponseEntity.ok(riwayat);
    }

}

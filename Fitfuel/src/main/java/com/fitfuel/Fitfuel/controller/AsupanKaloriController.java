package com.fitfuel.Fitfuel.controller;

import com.fitfuel.Fitfuel.model.AsupanKalori;
import com.fitfuel.Fitfuel.repository.AsupanKaloriRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/asupan")
public class AsupanKaloriController {

    @Autowired
    private AsupanKaloriRepository asupanKaloriRepository;

    // Input Asupan Kalori
    @PostMapping
    public ResponseEntity<String> inputAsupan(@RequestBody AsupanKalori asupanKalori) {
        asupanKaloriRepository.save(asupanKalori);
        return ResponseEntity.ok("Asupan kalori berhasil dicatat!");
    }

    // Lihat Riwayat Asupan Kalori
    @GetMapping
    public List<AsupanKalori> getRiwayatAsupan() {
        return asupanKaloriRepository.findAll();
    }
}

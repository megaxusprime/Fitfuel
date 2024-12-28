package com.fitfuel.Fitfuel.controller;

import com.fitfuel.Fitfuel.model.TargetKalori;
import com.fitfuel.Fitfuel.repository.TargetKaloriRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/target-kalori") // Semua endpoint target kalori
public class TargetKaloriController {

    @Autowired
    private TargetKaloriRepository targetKaloriRepository;

    // Tambah target kalori baru
    @PostMapping
    public ResponseEntity<String> setTargetKalori(@RequestBody TargetKalori targetKalori) {
        targetKaloriRepository.save(targetKalori);
        return ResponseEntity.status(HttpStatus.CREATED).body("Target kalori berhasil diatur!");
    }

    // Ambil target kalori berdasarkan username
    @GetMapping("/{username}")
    public ResponseEntity<List<TargetKalori>> getTargetKaloriByUsername(@PathVariable String username) {
        List<TargetKalori> targetKaloriList = targetKaloriRepository.findByUsername(username);
        if (targetKaloriList.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(targetKaloriList);
    }
}

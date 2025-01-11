package com.fitfuel.Fitfuel.controller;

import com.fitfuel.Fitfuel.model.Pengguna;
import com.fitfuel.Fitfuel.model.TargetKalori;
import com.fitfuel.Fitfuel.repository.AsupanKaloriRepository;
import com.fitfuel.Fitfuel.repository.PenggunaRepository;
import com.fitfuel.Fitfuel.repository.TargetKaloriRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/target-kalori")
public class TargetKaloriController {

    @Autowired
    private TargetKaloriRepository targetKaloriRepository;

    @Autowired
    private AsupanKaloriRepository asupanKaloriRepository;

    @Autowired
    private PenggunaRepository penggunaRepository;

    @PersistenceContext
    private EntityManager entityManager;

    // Tambah target kalori baru
    @PostMapping
    public ResponseEntity<String> setTargetKalori(@RequestBody TargetKalori targetKalori) {
        targetKalori.setTanggal(new Date()); // Set tanggal saat ini
        targetKalori.setAchieveKalori(false); // Default belum tercapai
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

    public Double getSummaryCalories(long penggunaId) {
        String jpql = "SELECT SUM(k.kalori * k.jumlah) FROM AsupanKalori k WHERE k.pengguna.id = :penggunaId";
        try {
            return (Double) entityManager.createQuery(jpql)
                    .setParameter("penggunaId", penggunaId)
                    .getSingleResult();
        } catch (NoResultException e) {
            return null; // Jika tidak ada data
        }
    }

    @GetMapping("/sum/kalori")
    public ResponseEntity<?> getKaloriUser(HttpServletRequest request) {
        String username = (String) request.getAttribute("username");
        Pengguna pengguna = penggunaRepository.findByUsername(username);

        if (pengguna == null) {
            return ResponseEntity.status(401).body("Pengguna tidak ditemukan");
        }
        double kalori = getSummaryCalories(pengguna.getId());
        Map<String, Object> response = new HashMap<>();
        response.put("kalori", kalori);
        return ResponseEntity.ok(response);
    }

    // Ambil target kalori berdasarkan username dan tanggal
    @GetMapping("/{username}/tanggal")
    public ResponseEntity<List<TargetKalori>> getTargetKaloriByTanggal(
            @PathVariable String username,
            @RequestParam("tanggal") @DateTimeFormat(pattern = "yyyy-MM-dd") Date tanggal) {
        List<TargetKalori> targetKaloriList = targetKaloriRepository.findByUsernameAndTanggal(username, tanggal);
        if (targetKaloriList.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(targetKaloriList);
    }

    // Tandai target kalori sebagai tercapai
    @PutMapping("/{id}/achieve")
    public ResponseEntity<String> achieveTargetKalori(@PathVariable Long id) {
        TargetKalori targetKalori = targetKaloriRepository.findById(id).orElse(null);
        if (targetKalori == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Target kalori tidak ditemukan!");
        }
        targetKalori.setAchieveKalori(true);
        targetKaloriRepository.save(targetKalori);
        return ResponseEntity.ok("Target kalori berhasil ditandai sebagai tercapai!");
    }
}
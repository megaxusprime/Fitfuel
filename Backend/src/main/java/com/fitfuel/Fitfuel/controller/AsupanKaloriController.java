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

    // Update Asupan Kalori
    @PutMapping("/{id}")
    public ResponseEntity<?> updateAsupan(@PathVariable Long id, @RequestBody AsupanKalori updatedAsupan, HttpServletRequest request) {
        String username = (String) request.getAttribute("username");
        Pengguna pengguna = penggunaRepository.findByUsername(username);

        if (pengguna == null) {
            return ResponseEntity.status(401).body("Pengguna tidak ditemukan");
        }

        // Cari asupan kalori berdasarkan ID
        AsupanKalori existingAsupan = asupanKaloriRepository.findById(id).orElse(null);
        if (existingAsupan == null) {
            return ResponseEntity.status(404).body("Asupan kalori tidak ditemukan");
        }

        // Pastikan asupan kalori milik pengguna yang sedang login
        if (!existingAsupan.getPengguna().equals(pengguna)) {
            return ResponseEntity.status(403).body("Anda tidak memiliki akses untuk mengedit asupan ini");
        }

        // Perbarui data asupan kalori
        existingAsupan.setTanggal(updatedAsupan.getTanggal());
        existingAsupan.setMakanan(updatedAsupan.getMakanan());
        existingAsupan.setKalori(updatedAsupan.getKalori());
        existingAsupan.setJumlah(updatedAsupan.getJumlah());

        // Simpan perubahan
        AsupanKalori savedAsupan = asupanKaloriRepository.save(existingAsupan);
        return ResponseEntity.ok(savedAsupan);
    }

    // Delete Asupan Kalori
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAsupan(@PathVariable Long id, HttpServletRequest request) {
        String username = (String) request.getAttribute("username");
        Pengguna pengguna = penggunaRepository.findByUsername(username);

        if (pengguna == null) {
            return ResponseEntity.status(401).body("Pengguna tidak ditemukan");
        }

        // Cari asupan kalori berdasarkan ID
        AsupanKalori existingAsupan = asupanKaloriRepository.findById(id).orElse(null);
        if (existingAsupan == null) {
            return ResponseEntity.status(404).body("Asupan kalori tidak ditemukan");
        }

        // Pastikan asupan kalori milik pengguna yang sedang login
        if (!existingAsupan.getPengguna().equals(pengguna)) {
            return ResponseEntity.status(403).body("Anda tidak memiliki akses untuk menghapus asupan ini");
        }

        // Hapus asupan kalori
        asupanKaloriRepository.delete(existingAsupan);
        return ResponseEntity.ok("Asupan kalori berhasil dihapus");
    }

}

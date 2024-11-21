package com.example.Fitfuel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pengguna")
public class PenggunaController {

    @Autowired
    private PenggunaRepository penggunaRepository;

    // Endpoint untuk mendapatkan semua pengguna
    @GetMapping
    public List<Pengguna> getAllPengguna() {
        return penggunaRepository.findAll();
    }

    // Endpoint untuk mendapatkan pengguna berdasarkan ID
    @GetMapping("/{id}")
    public ResponseEntity<Pengguna> getPenggunaById(@PathVariable Long id) {
        Pengguna pengguna = penggunaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pengguna tidak ditemukan dengan ID: " + id));
        return ResponseEntity.ok(pengguna);
    }

    // Endpoint untuk menambahkan pengguna baru
    @PostMapping
    public Pengguna createPengguna(@RequestBody Pengguna pengguna) {
        return penggunaRepository.save(pengguna);
    }

    // Endpoint untuk mengupdate pengguna
    @PutMapping("/{id}")
    public ResponseEntity<Pengguna> updatePengguna(@PathVariable Long id, @RequestBody Pengguna penggunaDetails) {
        Pengguna pengguna = penggunaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pengguna tidak ditemukan dengan ID: " + id));

        // Update atribut pengguna
        pengguna.setNamaPengguna(penggunaDetails.getNamaPengguna());
        pengguna.setEmail(penggunaDetails.getEmail());
        pengguna.setPassword(penggunaDetails.getPassword());
        pengguna.setTinggiBadan(penggunaDetails.getProfil().getTinggiBadan());
        pengguna.setBeratBadan(penggunaDetails.getProfil().getBeratBadan());

        Pengguna updatedPengguna = penggunaRepository.save(pengguna);
        return ResponseEntity.ok(updatedPengguna);
    }

    // Endpoint untuk menghapus pengguna
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePengguna(@PathVariable Long id) {
        Pengguna pengguna = penggunaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pengguna tidak ditemukan dengan ID: " + id));

        penggunaRepository.delete(pengguna);
        return ResponseEntity.ok("Pengguna berhasil dihapus");
    }
}


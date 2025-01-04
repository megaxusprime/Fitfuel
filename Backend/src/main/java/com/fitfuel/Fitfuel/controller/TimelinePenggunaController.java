package com.fitfuel.Fitfuel.controller;

import com.fitfuel.Fitfuel.model.TimelinePengguna;
import com.fitfuel.Fitfuel.repository.TimelinePenggunaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pengguna/timeline-pengguna")  // Ganti '/timeline' dengan '/timeline-pengguna'
public class TimelinePenggunaController {

    @Autowired
    private TimelinePenggunaRepository timelinePenggunaRepository;

    // Tambah timeline baru
    @PostMapping
    public ResponseEntity<TimelinePengguna> addTimeline(@RequestBody TimelinePengguna timelinePengguna) {
        TimelinePengguna savedTimeline = timelinePenggunaRepository.save(timelinePengguna);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTimeline);
    }

    // Ambil semua timeline
    @GetMapping
    public ResponseEntity<List<TimelinePengguna>> getAllTimelines() {
        List<TimelinePengguna> timelines = timelinePenggunaRepository.findAll();
        if (timelines.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(timelines);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TimelinePengguna> updateTimeline(@PathVariable Long id, @RequestBody TimelinePengguna updatedTimeline) {
        return timelinePenggunaRepository.findById(id)
                .map(existingTimeline -> {
                    existingTimeline.setCatatanKemajuan(updatedTimeline.getCatatanKemajuan());
                    existingTimeline.setTanggal(updatedTimeline.getTanggal());
                    // Tambahkan properti lain yang perlu diperbarui
                    TimelinePengguna savedTimeline = timelinePenggunaRepository.save(existingTimeline);
                    return ResponseEntity.ok(savedTimeline); // Kembalikan ResponseEntity dengan tipe TimelinePengguna
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build()); // Kembalikan ResponseEntity dengan HTTP 404
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTimeline(@PathVariable Long id) {
        return timelinePenggunaRepository.findById(id)
                .map(existingTimeline -> {
                    timelinePenggunaRepository.delete(existingTimeline);
                    return ResponseEntity.ok("Postingan berhasil dihapus");
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Postingan tidak ditemukan"));
    }

}

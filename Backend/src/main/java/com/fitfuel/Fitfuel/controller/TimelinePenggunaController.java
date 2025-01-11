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
    public ResponseEntity<?> addTimeline(@RequestBody TimelinePengguna timelinePengguna) {
        if (timelinePengguna.getCatatanKemajuan() == null || timelinePengguna.getCatatanKemajuan().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Catatan kemajuan tidak boleh kosong");
        }
        if (timelinePengguna.getTanggal() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Tanggal tidak boleh kosong");
        }

        TimelinePengguna savedTimeline = timelinePenggunaRepository.save(timelinePengguna);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTimeline);
    }


    // Ambil semua timeline
    @GetMapping
    public ResponseEntity<?> getAllTimelines() {
        List<TimelinePengguna> timelines = timelinePenggunaRepository.findAll();
        System.out.println("Data dari database: " + timelines);
        if (timelines.isEmpty()) {
            return ResponseEntity.ok(List.of());
        }
        return ResponseEntity.ok(timelines);
    }



    @PutMapping("/{id}")
    public ResponseEntity<TimelinePengguna> updateTimeline(@PathVariable Long id, @RequestBody TimelinePengguna updatedTimeline) {
        return timelinePenggunaRepository.findById(id)
                .map(existingTimeline -> {
                    System.out.println("Sebelum update: " + existingTimeline);

                    existingTimeline.setCatatanKemajuan(updatedTimeline.getCatatanKemajuan());
                    existingTimeline.setTanggal(updatedTimeline.getTanggal());

                    TimelinePengguna savedTimeline = timelinePenggunaRepository.save(existingTimeline);

                    System.out.println("Setelah update: " + savedTimeline);

                    return ResponseEntity.ok(savedTimeline); // Pastikan data yang diperbarui dikembalikan
                })
                .orElseGet(() -> {
                    System.out.println("Postingan dengan ID " + id + " tidak ditemukan.");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
                });
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

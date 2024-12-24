package com.fitfuel.Fitfuel.controller;

import com.fitfuel.Fitfuel.model.TimelinePengguna;
import com.fitfuel.Fitfuel.repository.TimelinePenggunaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/timeline") // Semua endpoint timeline di bawah /api/timeline
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
}

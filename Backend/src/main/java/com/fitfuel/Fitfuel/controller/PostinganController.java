package com.fitfuel.Fitfuel.controller;

import com.fitfuel.Fitfuel.model.Postingan;
import com.fitfuel.Fitfuel.repository.PostinganRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/postingan")
public class PostinganController {

    @Autowired
    private PostinganRepository postinganRepository;

    // Tambahkan postingan baru
    @PostMapping
    public ResponseEntity<Postingan> addPostingan(@RequestBody Postingan postingan) {
        Postingan savedPostingan = postinganRepository.save(postingan);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPostingan);
    }

    // Dapatkan semua postingan
    @GetMapping
    public ResponseEntity<List<Postingan>> getAllPostingan() {
        List<Postingan> postinganList = postinganRepository.findAll();
        if (postinganList.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(postinganList);
    }

    // Dapatkan postingan berdasarkan ID
    @GetMapping("/{id}")
    public ResponseEntity<Postingan> getPostinganById(@PathVariable Long id) {
        Optional<Postingan> postingan = postinganRepository.findById(id);
        if (postingan.isPresent()) {
            return ResponseEntity.ok(postingan.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    // Perbarui postingan
    @PutMapping("/{id}")
    public ResponseEntity<Postingan> updatePostingan(@PathVariable Long id, @RequestBody Postingan updatedPostingan) {
        Optional<Postingan> postinganOptional = postinganRepository.findById(id);
        if (postinganOptional.isPresent()) {
            Postingan postingan = postinganOptional.get();
            postingan.setKonten(updatedPostingan.getKonten());
            postingan.setGambar(updatedPostingan.getGambar());
            Postingan savedPostingan = postinganRepository.save(postingan);
            return ResponseEntity.ok(savedPostingan);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    // Hapus postingan
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePostingan(@PathVariable Long id) {
        if (postinganRepository.existsById(id)) {
            postinganRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}

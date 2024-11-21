package com.example.Fitfuel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PenggunaRepository extends JpaRepository<Pengguna, Long> {
    // Tambahkan custom query jika diperlukan
    Pengguna findByUsername(String username);
}


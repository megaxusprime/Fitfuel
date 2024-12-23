package com.fitfuel.Fitfuel.repository;

import com.fitfuel.Fitfuel.model.Pengguna;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PenggunaRepository extends JpaRepository<Pengguna, Long> {

    // Cek apakah username sudah ada
    boolean existsByUsername(String username);

    // Cari pengguna berdasarkan username
    Pengguna findByUsername(String username);
}

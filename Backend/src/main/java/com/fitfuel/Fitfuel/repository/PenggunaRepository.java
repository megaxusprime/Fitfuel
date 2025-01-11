package com.fitfuel.Fitfuel.repository;

import com.fitfuel.Fitfuel.model.Pengguna;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PenggunaRepository extends JpaRepository<Pengguna, Long> {
    Pengguna findByEmail(String email);
    Pengguna findByUsername(String username);
    boolean existsByUsername(String username);
}

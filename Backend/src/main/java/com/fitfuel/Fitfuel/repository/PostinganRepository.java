package com.fitfuel.Fitfuel.repository;

import com.fitfuel.Fitfuel.model.Postingan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostinganRepository extends JpaRepository<Postingan, Long> {
    // Tambahkan query kustom jika diperlukan
}

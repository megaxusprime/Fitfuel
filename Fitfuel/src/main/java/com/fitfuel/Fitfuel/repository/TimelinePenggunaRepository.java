package com.fitfuel.Fitfuel.repository;

import com.fitfuel.Fitfuel.model.TimelinePengguna;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TimelinePenggunaRepository extends JpaRepository<TimelinePengguna, Long> {
    // Tambahkan query kustom jika diperlukan
}

package com.fitfuel.Fitfuel.repository;

import com.fitfuel.Fitfuel.model.AsupanKalori;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AsupanKaloriRepository extends JpaRepository<AsupanKalori, Long> {
    // Tambahkan metode kustom jika diperlukan, misalnya berdasarkan tanggal
}

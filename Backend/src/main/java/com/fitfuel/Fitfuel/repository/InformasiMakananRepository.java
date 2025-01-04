package com.fitfuel.Fitfuel.repository;

import com.fitfuel.Fitfuel.model.InformasiMakanan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InformasiMakananRepository extends JpaRepository<InformasiMakanan, Long> {
    // Tidak perlu menambahkan metode kustom untuk findAll
}

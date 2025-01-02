package com.fitfuel.Fitfuel.repository;

import com.fitfuel.Fitfuel.model.AsupanKalori;
import com.fitfuel.Fitfuel.model.Pengguna;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AsupanKaloriRepository extends JpaRepository<AsupanKalori, Long> {
    // Query untuk mengambil data berdasarkan pengguna
    List<AsupanKalori> findByPengguna(Pengguna pengguna);

}

package com.fitfuel.Fitfuel.repository;

import com.fitfuel.Fitfuel.model.TargetKalori;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface TargetKaloriRepository extends JpaRepository<TargetKalori, Long> {
    List<TargetKalori> findByUsername(String username);
    List<TargetKalori> findByUsernameAndTanggal(String username, Date tanggal);
}

package com.fitfuel.Fitfuel.repository;

import com.fitfuel.Fitfuel.model.RekomendasiMakanan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RekomendasiMakananRepository extends JpaRepository<RekomendasiMakanan, Long> {

    @Query("SELECT r FROM RekomendasiMakanan r WHERE LOWER(r.namaMakanan) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<RekomendasiMakanan> searchByKeyword(@Param("keyword") String keyword);
}


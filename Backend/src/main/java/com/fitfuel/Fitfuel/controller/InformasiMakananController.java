package com.fitfuel.Fitfuel.controller;

import com.fitfuel.Fitfuel.model.InformasiMakanan;
import com.fitfuel.Fitfuel.repository.InformasiMakananRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/makanan")
public class InformasiMakananController {

    @Autowired
    private InformasiMakananRepository informasiMakananRepository;

    // Informasi Kalori Makanan
    @GetMapping
    public List<InformasiMakanan> getAllMakanan() {
        return informasiMakananRepository.findAll();
    }
}

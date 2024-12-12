package com.fitfuel.Fitfuel.controller;

import java.util.List;
import com.fitfuel.Fitfuel.model.Pengguna;
import com.fitfuel.Fitfuel.repository.PenggunaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PenggunaController {

    @Autowired
    private PenggunaRepository penggunaRepository;

    @PostMapping("/pengguna")
    Pengguna newPengguna(@RequestBody Pengguna newPengguna){
        return penggunaRepository.save(newPengguna);
    }

    @GetMapping("/ppengguna")
    List<Pengguna> getAllUsers(){
        return penggunaRepository.findAll();
    } 
}

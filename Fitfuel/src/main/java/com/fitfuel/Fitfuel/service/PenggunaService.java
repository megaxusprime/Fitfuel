package com.fitfuel.Fitfuel.service;

import com.fitfuel.Fitfuel.dto.RegisterRequest;
import com.fitfuel.Fitfuel.model.Pengguna;
import com.fitfuel.Fitfuel.model.ProfilPengguna;
import com.fitfuel.Fitfuel.model.TimelinePengguna;
import com.fitfuel.Fitfuel.repository.PenggunaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PenggunaService implements UserDetailsService {

    @Autowired
    private PenggunaRepository penggunaRepository;

    // Registrasi Pengguna
    public Pengguna registerUser(Pengguna pengguna) {
        if (penggunaRepository.existsByUsername(pengguna.getUsername())) {
            throw new IllegalArgumentException("Username sudah digunakan");
        }
        pengguna.setPassword(pengguna.getPassword()); // Simpan password tanpa enkripsi
        return penggunaRepository.save(pengguna);
    }

    // Tambah Pengguna (Digunakan untuk Register via Controller)
    public void tambahPengguna(RegisterRequest registerRequest) {
        // Periksa apakah username sudah digunakan
        if (penggunaRepository.existsByUsername(registerRequest.getUsername())) {
            throw new IllegalArgumentException("Username sudah digunakan");
        }

        // Periksa apakah email sudah digunakan
        if (penggunaRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email sudah digunakan");
        }

        // Buat entitas pengguna baru
        Pengguna pengguna = new Pengguna();
        pengguna.setEmail(registerRequest.getEmail());
        pengguna.setPassword(registerRequest.getPassword());
        pengguna.setUsername(registerRequest.getUsername());
        pengguna.setNamaPengguna(registerRequest.getNamaPengguna());

        // Simpan pengguna baru ke database
        penggunaRepository.save(pengguna);
    }


    // Validasi pengguna untuk login
    public boolean isValidUser(String email, String password) {
        return penggunaRepository.findByEmail(email)
                .map(pengguna -> pengguna.getPassword().equals(password)) // Bandingkan password plaintext
                .orElse(false); // Jika pengguna tidak ditemukan, return false
    }

    // Mendapatkan semua pengguna
    public List<Pengguna> getAllUsers() {
        return penggunaRepository.findAll();
    }

    // Mendapatkan Profil Pengguna berdasarkan username
    public ProfilPengguna getProfilByUsername(String username) {
        Pengguna pengguna = penggunaRepository.findByUsername(username);
        if (pengguna != null) {
            return pengguna.getProfil();
        }
        return null;
    }

    // Mengupdate Profil Pengguna
    public boolean updateProfil(String username, ProfilPengguna updatedProfil) {
        Pengguna pengguna = penggunaRepository.findByUsername(username);
        if (pengguna != null) {
            ProfilPengguna profil = pengguna.getProfil();
            profil.updateProfil(updatedProfil.getTinggiBadan(), updatedProfil.getBeratBadan());
            penggunaRepository.save(pengguna);
            return true;
        }
        return false;
    }

    // Menambahkan Timeline Pengguna
    public boolean addTimeline(String username, TimelinePengguna timelinePengguna) {
        Pengguna pengguna = penggunaRepository.findByUsername(username);
        if (pengguna != null) {
            pengguna.getTimeline().add(timelinePengguna);
            penggunaRepository.save(pengguna);
            return true;
        }
        return false;
    }

    // Implementasi dari UserDetailsService untuk Spring Security
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Pengguna pengguna = penggunaRepository.findByUsername(username);
        if (pengguna == null) {
            throw new UsernameNotFoundException("User not found: " + username);
        }
        return User
                .withUsername(pengguna.getEmail())
                .password(pengguna.getPassword()) // Password disimpan tanpa enkripsi
                .authorities("USER") // Anda dapat menyesuaikan peran sesuai kebutuhan
                .build();
    }
}

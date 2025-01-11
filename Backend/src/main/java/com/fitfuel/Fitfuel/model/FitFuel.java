package com.fitfuel.Fitfuel.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class FitFuel {

    public static void main(String[] args) {
        // Membuat ProfilPengguna
        ProfilPengguna profilPengguna = new ProfilPengguna();
        profilPengguna.setTinggiBadan(170.5);
        profilPengguna.setBeratBadan(65.2);
        profilPengguna.setTargetKaloriHarian(2000);

        // Membuat Pengguna dengan Profil
        Pengguna pengguna = new Pengguna();
        pengguna.setUsername("john_doe");
        pengguna.setNamaPengguna("John Doe");
        pengguna.setEmail("john.doe@example.com");
        pengguna.setPassword("securepassword");
        pengguna.setProfil(profilPengguna);

        // Menampilkan data awal pengguna
        System.out.println("=== Data Pengguna ===");
        System.out.println("Username: " + pengguna.getUsername());
        System.out.println("Nama: " + pengguna.getNamaPengguna());
        System.out.println("Email: " + pengguna.getEmail());
        System.out.println("Profil: " + pengguna.getProfil().tampilkanProfil());

        // Menambahkan TimelinePengguna
        TimelinePengguna timeline1 = new TimelinePengguna();
        timeline1.setTanggal(new Date());
        timeline1.setBeratBadan(65.2);
        timeline1.setCatatanKemajuan("Memulai program diet sehat.");

        TimelinePengguna timeline2 = new TimelinePengguna();
        timeline2.setTanggal(new Date());
        timeline2.setBeratBadan(64.8);
        timeline2.setCatatanKemajuan("Berhasil menurunkan 0.4 kg.");

        // Menambahkan timeline ke dalam pengguna
        List<TimelinePengguna> timelineList = new ArrayList<>();
        timelineList.add(timeline1);
        timelineList.add(timeline2);
        pengguna.setTimeline(timelineList);

        // Menampilkan TimelinePengguna
        System.out.println("\n=== Timeline Pengguna ===");
        for (TimelinePengguna timeline : pengguna.getTimeline()) {
            System.out.println("Tanggal: " + timeline.getTanggal());
            System.out.println("Berat Badan: " + timeline.getBeratBadan() + " kg");
            System.out.println("Catatan: " + timeline.getCatatanKemajuan());
            System.out.println("------------------------");
        }

        // Mengupdate ProfilPengguna
        System.out.println("\n=== Update Profil Pengguna ===");
        profilPengguna.updateProfil(169.0, 64.5);
        System.out.println("Profil Terbaru: " + pengguna.getProfil().tampilkanProfil());

        // Menambahkan Rekomendasi Makanan
        RekomendasiMakanan resep = new RekomendasiMakanan();
        resep.setNamaResep("Salad Buah");
        resep.setLangkahPembuatan("1. Potong buah; 2. Campurkan yogurt; 3. Sajikan.");

        System.out.println("\n=== Resep Rekomendasi ===");
        System.out.println("Resep: " + resep.getResep());
    }
}


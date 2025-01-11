package com.fitfuel.Fitfuel.controller;

import com.fitfuel.Fitfuel.model.AsupanKalori;
import com.fitfuel.Fitfuel.model.RekomendasiMakanan;
import com.fitfuel.Fitfuel.repository.AsupanKaloriRepository;
import com.fitfuel.Fitfuel.repository.RekomendasiMakananRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/food-search")
public class CariMakananController {

    @Autowired
    private AsupanKaloriRepository asupanKaloriRepository;

    @Autowired
    private RekomendasiMakananRepository rekomendasiMakananRepository;

    // Endpoint untuk pencarian berdasarkan riwayat asupan kalori pengguna
    @GetMapping("/history")
    public List<Map<String, Object>> searchFoodHistory(@RequestParam String keyword) {
        List<AsupanKalori> riwayat = asupanKaloriRepository.searchByKeyword(keyword);

        List<Map<String, Object>> hasil = new ArrayList<>();
        riwayat.forEach(item -> {
            Map<String, Object> data = new HashMap<>();
            data.put("makanan", item.getMakanan());
            data.put("kalori", item.getKalori());
            data.put("kategori", "Riwayat Asupan");
            hasil.add(data);
        });

        return hasil;
    }

    // Endpoint untuk pencarian rekomendasi makanan
    @GetMapping("/recommended")
    public List<Map<String, Object>> searchRecommendedFood(@RequestParam String keyword) {
        // Data statis berdasarkan rekomendasi makanan di frontend
        List<Map<String, Object>> rekomendasi = List.of(
                Map.of("namaMakanan", "Mixed Green Salad", "kalori", 180, "kategori", "Vegetarian"),
                Map.of("namaMakanan", "Whey Protein Shake", "kalori", 120, "kategori", "Low Carb"),
                Map.of("namaMakanan", "Mie Shirataki", "kalori", 60, "kategori", "Low Carb"),
                Map.of("namaMakanan", "Sheet Pan Chicken Fajitas", "kalori", 310, "kategori", "Fiber Rich"),
                Map.of("namaMakanan", "Seared Salmon With Charred Green Beans", "kalori", 285, "kategori", "Fiber Rich"),
                Map.of("namaMakanan", "Sautéed Broccoli with Peanut Sauce", "kalori", 154, "kategori", "Fiber Rich"),
                Map.of("namaMakanan", "Salmon-Stuffed Avocados", "kalori", 293, "kategori", "Fiber Rich"),
                Map.of("namaMakanan", "Cherry Tomato & Garlic Pasta", "kalori", 385, "kategori", "Fiber Rich"),
                Map.of("namaMakanan", "Kale & Avocado Salad with Blueberries & Edamame", "kalori", 376, "kategori", "Vegetarian"),
                Map.of("namaMakanan", "Air Fryer Squash Soup", "kalori", 280, "kategori", "Fiber Rich"),
                Map.of("namaMakanan", "Apple", "kalori", 80, "kategori", "Fiber Rich"),
                Map.of("namaMakanan", "Spinach Ravioli with Artichokes & Olives", "kalori", 454, "kategori", "Vegetarian")
        );

        // Filter hasil berdasarkan keyword
        List<Map<String, Object>> hasil = new ArrayList<>();
        for (Map<String, Object> item : rekomendasi) {
            if (item.get("namaMakanan").toString().toLowerCase().contains(keyword.toLowerCase())) {
                hasil.add(item);
            }
        }

        return hasil;
    }
}

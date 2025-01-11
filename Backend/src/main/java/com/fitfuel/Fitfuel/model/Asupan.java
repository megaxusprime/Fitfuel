package com.fitfuel.Fitfuel.model;

import java.util.List;

public interface Asupan {
    // Method untuk mendapatkan riwayat asupan
    List<AsupanKalori> getRiwayatAsupan();

    // Method untuk menghitung total kalori
    float hitungTotalKalori();

    // Method untuk mencatat asupan
    void catatAsupan();
}

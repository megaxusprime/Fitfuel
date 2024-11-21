/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.tubes_pbo_impal;

/**
 *
 * @author ASUS
 */
import java.util.List;

public interface Asupan {

    // Method untuk mendapatkan riwayat asupan
    List<AsupanKalori> getRiwayatAsupan();

    // Method untuk menghitung total kalori
    float hitungTotalKalori();

    // Method untuk mencatat asupan
    void catatAsupan();
}

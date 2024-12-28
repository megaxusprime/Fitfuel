package com.fitfuel.Fitfuel.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Semua endpoint diizinkan
                        .allowedOrigins("http://localhost:3000", "https://fitfuel.vercel.app") // Ganti dengan domain frontend
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // HTTP Methods yang diizinkan
                        .allowedHeaders("*") // Header yang diizinkan
                        .allowCredentials(true); // Untuk cookie/autentikasi
            }
        };
    }
}

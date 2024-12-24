package com.fitfuel.Fitfuel.config;

import com.fitfuel.Fitfuel.filter.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class WebSecurityConfig {

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // Matikan CSRF karena kita menggunakan JWT
                .csrf(csrf -> csrf.disable())

                // Atur otorisasi permintaan
                .authorizeHttpRequests(authorize -> authorize
                        // Izinkan akses tanpa autentikasi ke endpoint login dan register
                        .requestMatchers("/api/pengguna/login", "/api/pengguna/register").permitAll()
                        // Semua permintaan lainnya harus diautentikasi
                        .anyRequest().authenticated()
                )

                // Atur manajemen sesi sebagai stateless
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                );

        // Tambahkan filter JWT sebelum filter autentikasi username dan password
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}

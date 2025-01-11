package com.fitfuel.Fitfuel.config;

import com.fitfuel.Fitfuel.filter.JwtRequestFilter;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Date;
import java.util.function.Function;

@Configuration
public class WebSecurityConfig {

    private final JwtRequestFilter jwtRequestFilter;

    @Value("${jwt.secret}") // SECRET_KEY dari application.properties
    private String SECRET_KEY;

    public WebSecurityConfig(JwtRequestFilter jwtRequestFilter) {
        this.jwtRequestFilter = jwtRequestFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())  // Disable CSRF karena menggunakan JWT
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))  // Konfigurasi CORS
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(
                                "/api/pengguna/login",
                                "/api/pengguna/register",
                                "/api/pengguna/logout",
                                "/api/pengguna/timeline-pengguna",
                                "/api/food-search/history",  // Tambahkan endpoint riwayat
                                "/api/food-search/recommended" // Tambahkan endpoint rekomendasi
                        ).permitAll()  // Endpoint public
                        .requestMatchers("/api/asupan/**").authenticated()  // Proteksi endpoint asupan
                        .anyRequest().authenticated()  // Endpoint lainnya memerlukan autentikasi
                )

                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)  // Gunakan JWT, stateless session
                )
                .exceptionHandling(exceptions -> exceptions
                        .authenticationEntryPoint(authenticationEntryPoint())  // Tangani 401 Unauthorized
                        .accessDeniedHandler(accessDeniedHandler())  // Tangani 403 Forbidden
                );

        // Tambahkan filter JWT sebelum UsernamePasswordAuthenticationFilter
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:3000"); // URL Frontend Anda
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public HttpStatusEntryPoint authenticationEntryPoint() {
        return new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED);  // Tangani 401 Unauthorized
    }

    @Bean
    public AccessDeniedHandler accessDeniedHandler() {
        return (request, response, accessDeniedException) -> {
            response.setStatus(HttpStatus.FORBIDDEN.value());  // Tangani 403 Forbidden
            response.getWriter().write("Access Denied: " + accessDeniedException.getMessage());
        };
    }

    // Metode untuk membuat token JWT
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // Berlaku 10 jam
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    // Metode untuk mendapatkan username dari token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Ekstrak klaim dari token
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Ekstrak semua klaim dari token
    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    // Validasi token
    public boolean validateToken(String token) {
        try {
            Claims claims = extractAllClaims(token);
            if (claims.getExpiration().before(new Date())) {
                System.out.println("Token sudah kadaluarsa.");
                return false;
            }
            return true;
        } catch (JwtException e) {
            System.out.println("Token tidak valid: " + e.getMessage());
            return false;
        }
    }
}

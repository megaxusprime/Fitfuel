package com.fitfuel.Fitfuel.filter;

import com.fitfuel.Fitfuel.service.PenggunaService;
import com.fitfuel.Fitfuel.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private PenggunaService penggunaService;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        final String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;

        // Cek apakah header Authorization berisi "Bearer <token>"
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7); // Ambil token setelah "Bearer "
            try {
                username = jwtUtil.extractUsername(jwt); // Ekstrak username dari token
            } catch (Exception e) {
                System.err.println("Gagal mengekstrak username dari token JWT: " + e.getMessage());
            }
        }

        // Jika username ada dan belum ada autentikasi di konteks
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = penggunaService.loadUserByUsername(username);

            // Validasi token
            if (jwtUtil.validateToken(jwt, userDetails.getUsername())) {
                // Buat autentikasi
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Atur autentikasi di konteks
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // Lanjutkan filter chain
        chain.doFilter(request, response);
    }
}


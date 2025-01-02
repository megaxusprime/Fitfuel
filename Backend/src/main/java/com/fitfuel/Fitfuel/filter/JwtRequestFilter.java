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

        // Log header Authorization
        System.out.println("Authorization Header: " + authorizationHeader);

        // Cek apakah header Authorization berisi "Bearer <token>"
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7); // Ambil token setelah "Bearer "
            System.out.println("Extracted JWT: " + jwt);

            try {
                username = jwtUtil.extractUsername(jwt); // Ekstrak username dari token
                System.out.println("Extracted Username: " + username);
            } catch (Exception e) {
                System.err.println("Gagal mengekstrak username dari token JWT: " + e.getMessage());
            }
        } else {
            System.err.println("Authorization header tidak ditemukan atau formatnya salah.");
        }

        // Jika username ada dan belum ada autentikasi di konteks
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = penggunaService.loadUserByUsername(username);
            System.out.println("UserDetails Loaded: " + userDetails.getUsername());

            // Validasi token
                System.out.println("Token valid untuk username: " + userDetails.getUsername());
                request.setAttribute("user", userDetails);  //*NOTE* Buat attribute user di request
                request.setAttribute("username", username);
            // Buat autentikasi
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Atur autentikasi di konteks
                SecurityContextHolder.getContext().setAuthentication(authToken);
        } else if (username == null) {
            System.err.println("Username tidak ditemukan dalam token.");
        }
        chain.doFilter(request, response);
    }
}



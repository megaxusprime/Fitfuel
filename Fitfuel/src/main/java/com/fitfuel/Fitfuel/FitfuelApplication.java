package com.fitfuel.Fitfuel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class FitfuelApplication {

	public static void main(String[] args) {
		SpringApplication.run(FitfuelApplication.class, args);
	}

	// CORS Configuration
	@Configuration
	public static class WebConfig implements WebMvcConfigurer {

		@Override
		public void addCorsMappings(CorsRegistry registry) {
			registry.addMapping("/api/**")  // Mengizinkan semua endpoint dengan prefix /api
					.allowedOrigins("http://localhost:3000")  // URL frontend Next.js
					.allowedMethods("GET", "POST", "PUT", "DELETE")  // Metode yang diizinkan
					.allowedHeaders("*");  // Mengizinkan semua header
		}
	}

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
}

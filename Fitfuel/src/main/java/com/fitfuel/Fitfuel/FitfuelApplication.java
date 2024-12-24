package com.fitfuel.Fitfuel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
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
			registry.addMapping("/**")
					.allowedOrigins("https://fitfuel-dun.vercel.app")
					.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
		}
	}
}

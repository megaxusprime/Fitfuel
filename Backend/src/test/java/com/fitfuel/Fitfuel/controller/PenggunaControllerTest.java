package com.fitfuel.Fitfuel.controller;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import com.fitfuel.Fitfuel.controller.PenggunaController;
import com.fitfuel.Fitfuel.service.PenggunaService;
import com.fitfuel.Fitfuel.dto.RegisterRequest;
import java.util.Map;
import java.util.logging.Logger;

class PenggunaControllerTest {

    private static final Logger logger = Logger.getLogger(PenggunaControllerTest.class.getName());

    @Mock
    private PenggunaService penggunaService;

    @InjectMocks
    private PenggunaController penggunaController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRegisterUser_AllValidationsPass() {
        // Arrange
        RegisterRequest request = new RegisterRequest();
        request.setUsername("validUser");
        request.setNamaPengguna("Valid Name");
        request.setEmail("valid@example.com");
        request.setPassword("strongpassword");

        logger.info("Running testRegisterUser_AllValidationsPass");

        // Act
        ResponseEntity<?> response = penggunaController.registerUser(request);

        // Assert
        logger.info("Response: " + response);
        assertEquals(200, response.getStatusCodeValue());
        assertTrue(((Map<?, ?>) response.getBody()).get("message").equals("Pengguna berhasil ditambahkan"));
    }

    @Test
    void testRegisterUser_UsernameEmpty() {
        // Arrange
        RegisterRequest request = new RegisterRequest();
        request.setUsername("");
        request.setNamaPengguna("Valid Name");
        request.setEmail("valid@example.com");
        request.setPassword("strongpassword");

        logger.info("Running testRegisterUser_UsernameEmpty");

        // Act
        ResponseEntity<?> response = penggunaController.registerUser(request);

        // Assert
        logger.info("Response: " + response);
        assertEquals(400, response.getStatusCodeValue());
        assertTrue(((Map<?, ?>) response.getBody()).get("message").equals("Username tidak boleh kosong"));
    }

    @Test
    void testRegisterUser_NamaPenggunaEmpty() {
        // Arrange
        RegisterRequest request = new RegisterRequest();
        request.setUsername("validUser");
        request.setNamaPengguna("");
        request.setEmail("valid@example.com");
        request.setPassword("strongpassword");

        logger.info("Running testRegisterUser_NamaPenggunaEmpty");

        // Act
        ResponseEntity<?> response = penggunaController.registerUser(request);

        // Assert
        logger.info("Response: " + response);
        assertEquals(400, response.getStatusCodeValue());
        assertTrue(((Map<?, ?>) response.getBody()).get("message").equals("Nama Pengguna tidak boleh kosong"));
    }

    @Test
    void testRegisterUser_EmailEmpty() {
        // Arrange
        RegisterRequest request = new RegisterRequest();
        request.setUsername("validUser");
        request.setNamaPengguna("Valid Name");
        request.setEmail("");
        request.setPassword("strongpassword");

        logger.info("Running testRegisterUser_EmailEmpty");

        // Act
        ResponseEntity<?> response = penggunaController.registerUser(request);

        // Assert
        logger.info("Response: " + response);
        assertEquals(400, response.getStatusCodeValue());
        assertTrue(((Map<?, ?>) response.getBody()).get("message").equals("Email tidak boleh kosong"));
    }

    @Test
    void testRegisterUser_PasswordEmpty() {
        // Arrange
        RegisterRequest request = new RegisterRequest();
        request.setUsername("validUser");
        request.setNamaPengguna("Valid Name");
        request.setEmail("valid@example.com");
        request.setPassword("");

        logger.info("Running testRegisterUser_PasswordEmpty");

        // Act
        ResponseEntity<?> response = penggunaController.registerUser(request);

        // Assert
        logger.info("Response: " + response);
        assertEquals(400, response.getStatusCodeValue());
        assertTrue(((Map<?, ?>) response.getBody()).get("message").equals("Password tidak boleh kosong"));
    }

    @Test
    void testRegisterUser_DuplicateUsername() {
        // Arrange
        RegisterRequest request = new RegisterRequest();
        request.setUsername("existingUser");
        request.setNamaPengguna("Valid Name");
        request.setEmail("valid@example.com");
        request.setPassword("strongpassword");

        logger.info("Running testRegisterUser_DuplicateUsername");

        doThrow(new IllegalArgumentException("Username already exists"))
                .when(penggunaService).tambahPengguna(request);

        // Act
        ResponseEntity<?> response = penggunaController.registerUser(request);

        // Assert
        logger.info("Response: " + response);
        assertEquals(500, response.getStatusCodeValue());
        assertTrue(((Map<?, ?>) response.getBody()).get("message").equals("Gagal menambahkan pengguna. Silakan coba lagi."));
    }

    @Test
    void testRegisterUser_DuplicateEmail() {
        // Arrange
        RegisterRequest request = new RegisterRequest();
        request.setUsername("uniqueUser");
        request.setNamaPengguna("Valid Name");
        request.setEmail("duplicate@example.com");
        request.setPassword("strongpassword");

        logger.info("Running testRegisterUser_DuplicateEmail");

        doThrow(new IllegalArgumentException("Email already exists"))
                .when(penggunaService).tambahPengguna(request);

        // Act
        ResponseEntity<?> response = penggunaController.registerUser(request);

        // Assert
        logger.info("Response: " + response);
        assertEquals(500, response.getStatusCodeValue());
        assertTrue(((Map<?, ?>) response.getBody()).get("message").equals("Gagal menambahkan pengguna. Silakan coba lagi."));
    }
}

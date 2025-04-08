package com._errors.MovieMingle.controller;
import com._errors.MovieMingle.dto.OAuthDto;
import com._errors.MovieMingle.model.AppUser;
import com._errors.MovieMingle.service.user.DefaultAppUserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import com._errors.MovieMingle.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class LoginController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private DefaultAppUserService userService;

    // DTO pentru request de login
    public static class LoginRequest {
        @NotBlank(message = "Email is required")
        @Email(message = "Enter a valid email")
        private String email;

        @NotBlank(message = "Password is required")
        private String password;

        // Getters & Setters
        public String getEmail() {
            return email;
        }
        public void setEmail(String email) {
            this.email = email;
        }
        public String getPassword() {
            return password;
        }
        public void setPassword(String password) {
            this.password = password;
        }
    }

    // DTO pentru response cu tokenul JWT
    public static class TokenResponse {
        private String token;

        public TokenResponse(String token) {
            this.token = token;
        }

        public String getToken() {
            return token;
        }
        public void setToken(String token) {
            this.token = token;
        }
    }

    // POST /api/auth/login
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request, BindingResult result) {
        Map<String, String> errors = new HashMap<>();

        if (result.hasErrors()) {
            result.getFieldErrors().forEach(err ->
                    errors.put(err.getField(), err.getDefaultMessage()));
            return ResponseEntity.badRequest().body(errors);
        }

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            String token = jwtTokenProvider.generateToken(authentication);
            return ResponseEntity.ok(new TokenResponse(token));

        } catch (BadCredentialsException ex) {
            errors.put("general", "Invalid email or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errors);
        } catch (AuthenticationException ex) {
            errors.put("general", "Authentication failed");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errors);
        }
    }

    @PostMapping("/oauth2/google")
    public ResponseEntity<?> oauthLogin(@RequestBody OAuthDto user) {
        AppUser appUser = userService.processOAuth2User(
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                "google"
        );
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                appUser.getEmail(), null, AuthorityUtils.createAuthorityList(appUser.getRole())
        );

        String token = jwtTokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new TokenResponse(token));
    }


}

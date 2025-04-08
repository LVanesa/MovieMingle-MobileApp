package com._errors.MovieMingle.security;

import com._errors.MovieMingle.model.AppUser;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    // Secretul se definește în application.properties sau application.yml
    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}") // în milisecunde (ex: 86400000 = 1 zi)
    private long jwtExpirationInMs;

    // Creează cheia de semnare
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    // Generează token pentru un user autentificat
    public String generateToken(Authentication authentication) {
        AppUser user = (AppUser) authentication.getPrincipal(); // cast ok acum
        String username = user.getEmail(); // sau .getUsername(), același lucru
        Long userId = (long) user.getId();

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        return Jwts.builder()
                .setSubject(username)
                .claim("userId", userId)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }


    // Obține username-ul (emailul) din JWT
    public String getUsernameFromJWT(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    // Verifică dacă tokenul este valid
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException ex) {
            // log.error("Invalid JWT token: {}", ex.getMessage());
            return false;
        }
    }
}

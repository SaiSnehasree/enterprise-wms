package com.sneha.wms.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class jwtUtil {

    private static final Key
            SECRET_KEY =

            Keys.secretKeyFor(
                    SignatureAlgorithm
                            .HS256
            );

    // GENERATE TOKEN
    public String
    generateToken(
            String username
    ) {

        return Jwts.builder()

                .setSubject(
                        username
                )

                .setIssuedAt(
                        new Date()
                )

                .setExpiration(
                        new Date(
                                System
                                        .currentTimeMillis()

                                        +

                                        1000 * 60 * 60
                        )
                )

                .signWith(
                        SECRET_KEY
                )

                .compact();
    }

    // EXTRACT USERNAME
    public String
    extractUsername(
            String token
    ) {

        return extractClaims(
                token
        ).getSubject();
    }

    // EXTRACT CLAIMS
    public Claims
    extractClaims(
            String token
    ) {

        return Jwts.parserBuilder()

                .setSigningKey(
                        SECRET_KEY
                )

                .build()

                .parseClaimsJws(
                        token
                )

                .getBody();
    }

    // VALIDATE TOKEN
    public boolean
    validateToken(
            String token,
            String username
    ) {

        return extractUsername(
                token
        ).equals(
                username
        );
    }
}
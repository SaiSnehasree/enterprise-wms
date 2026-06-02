package com.sneha.wms.controller;

import com.sneha.wms.security.JwtUtil;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @PostMapping("/login")
    public Map<String, String> login(
            @RequestBody
            Map<String, String> request
    ) {

        String username =
                request.get(
                        "username"
                );

        String password =
                request.get(
                        "password"
                );

        if (
                "admin".equals(
                        username
                )
                        &&
                        "admin123".equals(
                                password
                        )
        ) {

            String token =
                    JwtUtil
                            .generateToken(
                                    username
                            );

            Map<String, String>
                    response =
                    new HashMap<>();

            response.put(
                    "token",
                    token
            );

            return response;
        }

        throw new RuntimeException(
                "Invalid Credentials"
        );
    }
}
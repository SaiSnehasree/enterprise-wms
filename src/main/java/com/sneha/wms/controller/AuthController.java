package com.sneha.wms.controller;

import com.sneha.wms.security.JwtUtil;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @GetMapping("/login")
    public Map<String, String> login() {

        String token =
                JwtUtil.generateToken(
                        "user");

        Map<String, String> response =
                new HashMap<>();

        response.put(
                "token",
                token);

        return response;
    }
}
package com.sneha.wms.controller;

import com.sneha.wms.entity.User;
import com.sneha.wms.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService
            authService;

    // REGISTER
    @PostMapping("/register")
    public User
    register(
            @RequestBody
            User user
    ) {

        return authService
                .register(
                        user
                );
    }

    // LOGIN
    @PostMapping("/login")
    public String
    login(
            @RequestBody
            Map<String, String>
                    request
    ) {

        return authService
                .login(

                        request.get(
                                "email"
                        ),

                        request.get(
                                "password"
                        )
                );
    }
    @GetMapping("/add-sample-user")
    public User
    addSampleUser() {

        User user =
                new User();

        user.setEmail(
                "admin@gmail.com"
        );

        user.setPassword(
                "admin123"
        );

        user.setRole(
                "ROLE_ADMIN"
        );

        return authService
                .register(user);
    }
    @GetMapping("/add-operator")
    public User
    addOperator() {

        User user =
                new User();

        user.setEmail(
                "operator@gmail.com"
        );

        user.setPassword(
                "operator123"
        );

        user.setRole(
                "ROLE_OPERATOR"
        );

        return authService
                .register(user);
    }
    @GetMapping("/login-test")
    public String
    loginTest() {

        return authService
                .login(
                        "admin@gmail.com",
                        "admin123"
                );
    }
}
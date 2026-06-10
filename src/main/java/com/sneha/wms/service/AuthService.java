package com.sneha.wms.service;

import com.sneha.wms.entity.User;
import com.sneha.wms.repository.UserRepository;
import com.sneha.wms.security.jwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository
            userRepository;

    @Autowired
    private jwtUtil
            jwtUtil;

    // REGISTER USER
    public User
    register(
            User user
    ) {

        return userRepository
                .save(user);
    }

    // LOGIN USER
    public String
    login(
            String email,
            String password
    ) {

        User user =
                userRepository
                        .findByEmail(
                                email
                        )

                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found!"
                                )
                        );

        if (
                !user.getPassword()
                        .equals(
                                password
                        )
        ) {

            throw new RuntimeException(
                    "Invalid password!"
            );
        }

        return jwtUtil
                .generateToken(

                        email,

                        user.getRole()
                );
    }
}
package com.sneha.wms.config;

import com.sneha.wms.security.JwtFilter;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

                .csrf(csrf ->
                        csrf.disable()
                )

                .cors(
                        Customizer.withDefaults()
                )

                .authorizeHttpRequests(auth ->

                        auth

                                // PUBLIC ENDPOINTS
                                .requestMatchers(
                                        "/auth/login",
                                        "/auth/register",
                                        "/auth/add-sample-user",
                                        "/auth/add-operator",
                                        "/auth/login-test",
                                        "/ai/**",
                                        "/error",
                                        "/products/qr/**"
                                )
                                .permitAll()

                                // ADMIN ONLY
                                .requestMatchers(
                                        "/warehouse/**",
                                        "/storage-bin/**"
                                )
                                .hasRole("ADMIN")

                                // ADMIN + OPERATOR
                                .requestMatchers(
                                        "/products/**",
                                        "/inventory/**",
                                        "/orders/**"
                                )
                                .hasAnyRole(
                                        "ADMIN",
                                        "OPERATOR"
                                )

                                // EVERYTHING ELSE
                                .anyRequest()
                                .authenticated()
                )

                // JWT FILTER
                .addFilterBefore(
                        jwtFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}
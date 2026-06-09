package com.sneha.wms.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config
        .Customizer;

import org.springframework.security.config.annotation.web
        .builders.HttpSecurity;

import org.springframework.security.web
        .SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain
    securityFilterChain(
            HttpSecurity http
    )
            throws Exception {

        http

                .csrf(csrf ->
                        csrf.disable()
                )

                .cors(
                        Customizer
                                .withDefaults()
                )

                .authorizeHttpRequests(auth ->

                        auth

                                // AUTH APIs
                                .requestMatchers(
                                        "/auth/**"
                                )
                                .permitAll()

                                // PUBLIC APIs
                                .requestMatchers(
                                        "/products/**",
                                        "/warehouse/**",
                                        "/inventory/**",
                                        "/storage-bin/**",
                                        "/orders/**"
                                )
                                .permitAll()

                                // Everything else secured
                                .anyRequest()
                                .authenticated()
                );

        return http.build();
    }
}
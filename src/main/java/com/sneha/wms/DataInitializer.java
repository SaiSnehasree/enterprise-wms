package com.sneha.wms;

import com.sneha.wms.entity.User;
import com.sneha.wms.repository.UserRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer
        implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {

        this.userRepository =
                userRepository;

        this.passwordEncoder =
                passwordEncoder;
    }

    @Override
    public void run(
            String... args
    ) {

        boolean userExists =
                userRepository
                        .findByEmail(
                                "admin@gmail.com"
                        )
                        .isPresent();

        if (!userExists) {

            User admin =
                    new User();

            admin.setEmail(
                    "admin@gmail.com"
            );

            admin.setPassword(
                    passwordEncoder
                            .encode(
                                    "admin123"
                            )
            );

            admin.setRole(
                    "ROLE_ADMIN"
            );

            userRepository
                    .save(admin);

            System.out.println(
                    "////////////////////////////////////////////////////"
            );

            System.out.println(
                    "Admin user created!"
            );

            System.out.println(
                    "Email: admin@gmail.com"
            );

            System.out.println(
                    "Password: admin123"
            );

            System.out.println(
                    "////////////////////////////////////////////////////"
            );
        }
    }
}
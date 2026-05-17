package com.example.financialdashboard.auth;

import com.example.financialdashboard.user.User;
import com.example.financialdashboard.user.UserRepository;
import com.example.financialdashboard.user.UserResponse;
import com.example.financialdashboard.user.UserRole;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AuthResponse signup(SignupRequest request) {
        String normalizedEmail = request.email().trim().toLowerCase();
        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new EmailAlreadyExistsException(normalizedEmail);
        }

        User user = new User(
                request.name().trim(),
                normalizedEmail,
                passwordEncoder.encode(request.password()),
                UserRole.USER
        );
        user.setAuthToken(generateToken());

        User savedUser = userRepository.save(user);
        return new AuthResponse(savedUser.getAuthToken(), UserResponse.from(savedUser));
    }

    public AuthResponse login(LoginRequest request) {
        String normalizedEmail = request.email().trim().toLowerCase();
        User user = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new UnauthorizedException("Invalid email or password."));

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new UnauthorizedException("Invalid email or password.");
        }

        user.setAuthToken(generateToken());
        User savedUser = userRepository.save(user);
        return new AuthResponse(savedUser.getAuthToken(), UserResponse.from(savedUser));
    }

    public User getAuthenticatedUser(String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException("Missing or invalid authorization token.");
        }

        String token = authorizationHeader.substring(7).trim();
        if (token.isEmpty()) {
            throw new UnauthorizedException("Missing or invalid authorization token.");
        }

        return userRepository.findByAuthToken(token)
                .orElseThrow(() -> new UnauthorizedException("Invalid authorization token."));
    }

    private String generateToken() {
        return UUID.randomUUID().toString();
    }
}

package com.example.financialdashboard.auth;

import com.example.financialdashboard.user.UserResponse;

public record AuthResponse(
        String token,
        UserResponse user
) {
}

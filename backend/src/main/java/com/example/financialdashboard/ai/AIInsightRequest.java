package com.example.financialdashboard.ai;

import jakarta.validation.constraints.NotBlank;

public record AIInsightRequest(
        @NotBlank String question
) {
}

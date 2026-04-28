package com.example.financialdashboard.transaction;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

public record TransactionRequest(
        @NotBlank String category,
        @NotBlank String name,
        @NotNull BigDecimal amount,
        @NotNull LocalDate date
) {
}

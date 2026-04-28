package com.example.financialdashboard.dashboard;

import java.math.BigDecimal;

public record CategoryBreakdownItem(
        String category,
        BigDecimal amount,
        BigDecimal percentage
) {
}

package com.example.financialdashboard.dashboard;

import java.math.BigDecimal;

public record DashboardSummaryResponse(
        BigDecimal totalIncome,
        BigDecimal totalExpense,
        BigDecimal netProfit
) {
}

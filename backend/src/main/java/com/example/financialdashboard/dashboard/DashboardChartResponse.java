package com.example.financialdashboard.dashboard;

import java.math.BigDecimal;
import java.util.List;

public record DashboardChartResponse(
        BigDecimal income,
        BigDecimal expense,
        List<CategoryBreakdownItem> categories
) {
}

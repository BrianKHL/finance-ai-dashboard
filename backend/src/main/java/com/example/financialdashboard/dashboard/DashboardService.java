package com.example.financialdashboard.dashboard;

import com.example.financialdashboard.transaction.Transaction;
import com.example.financialdashboard.transaction.TransactionService;
import com.example.financialdashboard.user.User;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private static final BigDecimal ZERO = BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
    private final TransactionService transactionService;

    public DashboardService(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    public DashboardSummaryResponse getSummary(User user, LocalDate from, LocalDate to) {
        List<Transaction> transactions = transactionService.getTransactions(user, from, to);

        BigDecimal totalIncome = transactions.stream()
                .map(Transaction::getAmount)
                .filter(amount -> amount.signum() > 0)
                .reduce(ZERO, BigDecimal::add)
                .setScale(2, RoundingMode.HALF_UP);

        BigDecimal totalExpense = transactions.stream()
                .map(Transaction::getAmount)
                .filter(amount -> amount.signum() < 0)
                .map(BigDecimal::abs)
                .reduce(ZERO, BigDecimal::add)
                .setScale(2, RoundingMode.HALF_UP);

        BigDecimal netProfit = totalIncome.subtract(totalExpense).setScale(2, RoundingMode.HALF_UP);

        return new DashboardSummaryResponse(totalIncome, totalExpense, netProfit);
    }

    public DashboardChartResponse getChart(User user, LocalDate from, LocalDate to) {
        List<Transaction> transactions = transactionService.getTransactions(user, from, to);
        DashboardSummaryResponse summary = getSummary(user, from, to);

        BigDecimal totalExpense = summary.totalExpense();

        Map<String, BigDecimal> expensesByCategory = transactions.stream()
                .filter(transaction -> transaction.getAmount().signum() < 0)
                .collect(Collectors.groupingBy(
                        Transaction::getCategory,
                        Collectors.reducing(
                                ZERO,
                                transaction -> transaction.getAmount().abs(),
                                BigDecimal::add
                        )
                ));

        List<CategoryBreakdownItem> categories = expensesByCategory.entrySet().stream()
                .map(entry -> new CategoryBreakdownItem(
                        entry.getKey(),
                        entry.getValue().setScale(2, RoundingMode.HALF_UP),
                        calculatePercentage(entry.getValue(), totalExpense)
                ))
                .sorted(Comparator.comparing(CategoryBreakdownItem::amount).reversed())
                .toList();

        return new DashboardChartResponse(summary.totalIncome(), summary.totalExpense(), categories);
    }

    private BigDecimal calculatePercentage(BigDecimal amount, BigDecimal totalExpense) {
        if (totalExpense.signum() == 0) {
            return BigDecimal.ZERO.setScale(1, RoundingMode.HALF_UP);
        }

        return amount.multiply(BigDecimal.valueOf(100))
                .divide(totalExpense, 1, RoundingMode.HALF_UP);
    }
}

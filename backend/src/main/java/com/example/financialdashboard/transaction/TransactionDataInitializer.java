package com.example.financialdashboard.transaction;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;

@Component
public class TransactionDataInitializer implements ApplicationRunner {

    private final TransactionRepository transactionRepository;

    public TransactionDataInitializer(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (transactionRepository.count() > 0) {
            return;
        }

        transactionRepository.saveAll(java.util.List.of(
                new Transaction(
                        "Dining",
                        LocalDate.of(2023, 1, 1),
                        "Chick-fil-A",
                        BigDecimal.valueOf(-10.25)
                ),
                new Transaction(
                        "Income",
                        LocalDate.of(2023, 1, 3),
                        "Salary",
                        BigDecimal.valueOf(3200.00)
                ),
                new Transaction(
                        "Utilities",
                        LocalDate.of(2023, 1, 5),
                        "Electric Bill",
                        BigDecimal.valueOf(-120.50)
                ),
                new Transaction(
                        "Shopping",
                        LocalDate.of(2023, 1, 7),
                        "Target",
                        BigDecimal.valueOf(-84.99)
                ),
                new Transaction(
                        "Freelance",
                        LocalDate.of(2023, 1, 10),
                        "Side Project",
                        BigDecimal.valueOf(650.00)
                )
        ));
    }
}

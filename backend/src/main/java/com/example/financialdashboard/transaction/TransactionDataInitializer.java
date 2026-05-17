package com.example.financialdashboard.transaction;

import com.example.financialdashboard.user.User;
import com.example.financialdashboard.user.UserRepository;
import com.example.financialdashboard.user.UserRole;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Component
public class TransactionDataInitializer implements ApplicationRunner {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public TransactionDataInitializer(TransactionRepository transactionRepository, UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        User demoUser = userRepository.findByEmail("demo@financeai.com")
                .orElseGet(() -> userRepository.save(new User(
                        "Demo User",
                        "demo@financeai.com",
                        passwordEncoder.encode("password123"),
                        UserRole.ADMIN
                )));

        if (transactionRepository.countByUser(demoUser) > 0) {
            return;
        }

        List<Transaction> existingTransactions = transactionRepository.findAll();
        if (!existingTransactions.isEmpty()) {
            existingTransactions.forEach(transaction -> transaction.setUser(demoUser));
            transactionRepository.saveAll(existingTransactions);
            return;
        }

        transactionRepository.saveAll(List.of(
                new Transaction(
                        "Dining",
                        LocalDate.of(2023, 1, 1),
                        "Chick-fil-A",
                        BigDecimal.valueOf(-10.25),
                        demoUser
                ),
                new Transaction(
                        "Income",
                        LocalDate.of(2023, 1, 3),
                        "Salary",
                        BigDecimal.valueOf(3200.00),
                        demoUser
                ),
                new Transaction(
                        "Utilities",
                        LocalDate.of(2023, 1, 5),
                        "Electric Bill",
                        BigDecimal.valueOf(-120.50),
                        demoUser
                ),
                new Transaction(
                        "Shopping",
                        LocalDate.of(2023, 1, 7),
                        "Target",
                        BigDecimal.valueOf(-84.99),
                        demoUser
                ),
                new Transaction(
                        "Freelance",
                        LocalDate.of(2023, 1, 10),
                        "Side Project",
                        BigDecimal.valueOf(650.00),
                        demoUser
                )
        ));
    }
}

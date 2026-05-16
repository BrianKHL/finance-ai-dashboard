package com.example.financialdashboard.transaction;

import com.example.financialdashboard.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    long countByUser(User user);

    List<Transaction> findAllByUserOrderByDateDescIdDesc(User user);

    List<Transaction> findAllByUserAndDateBetweenOrderByDateDescIdDesc(User user, LocalDate from, LocalDate to);
}

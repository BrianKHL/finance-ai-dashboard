package com.example.financialdashboard.transaction;

import com.example.financialdashboard.user.User;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public List<Transaction> getTransactions(User user, LocalDate from, LocalDate to) {
        if (from != null && to != null) {
            return transactionRepository.findAllByUserAndDateBetweenOrderByDateDescIdDesc(user, from, to);
        }

        return transactionRepository.findAllByUserOrderByDateDescIdDesc(user);
    }

    public Transaction createTransaction(User user, TransactionRequest request) {
        Transaction transaction = new Transaction(
                request.category(),
                request.date(),
                request.name(),
                request.amount(),
                user
        );

        return transactionRepository.save(transaction);
    }

    public Transaction updateTransaction(User user, Long id, TransactionRequest request) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new TransactionNotFoundException(id));

        verifyOwnership(user, transaction);

        transaction.setCategory(request.category());
        transaction.setName(request.name());
        transaction.setAmount(request.amount());
        transaction.setDate(request.date());

        return transactionRepository.save(transaction);
    }

    public void deleteTransaction(User user, Long id) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new TransactionNotFoundException(id));

        verifyOwnership(user, transaction);

        transactionRepository.delete(transaction);
    }

    private void verifyOwnership(User user, Transaction transaction) {
        if (!transaction.getUser().getId().equals(user.getId())) {
            throw new TransactionNotFoundException(transaction.getId());
        }
    }
}

package com.example.financialdashboard.transaction;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public List<Transaction> getTransactions(LocalDate from, LocalDate to) {
        if (from != null && to != null) {
            return transactionRepository.findAllByDateBetweenOrderByDateDescIdDesc(from, to);
        }

        return transactionRepository.findAllByOrderByDateDescIdDesc();
    }

    public Transaction createTransaction(TransactionRequest request) {
        Transaction transaction = new Transaction(
                request.category(),
                request.date(),
                request.name(),
                request.amount()
        );

        return transactionRepository.save(transaction);
    }

    public Transaction updateTransaction(Long id, TransactionRequest request) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new TransactionNotFoundException(id));

        transaction.setCategory(request.category());
        transaction.setName(request.name());
        transaction.setAmount(request.amount());
        transaction.setDate(request.date());

        return transactionRepository.save(transaction);
    }

    public void deleteTransaction(Long id) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new TransactionNotFoundException(id));

        transactionRepository.delete(transaction);
    }
}

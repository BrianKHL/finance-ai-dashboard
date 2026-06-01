package com.example.financialdashboard.ai;

import com.example.financialdashboard.auth.UnauthorizedException;
import com.example.financialdashboard.transaction.Transaction;
import com.example.financialdashboard.transaction.TransactionService;
import com.example.financialdashboard.user.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class GeminiService {

    private final TransactionService transactionService;
    private final RestClient restClient;
    private final String geminiApiKey;
    private final String geminiModel;

    public GeminiService(
            TransactionService transactionService,
            @Value("${gemini.api.key}") String geminiApiKey,
            @Value("${gemini.model}") String geminiModel
    ) {
        this.transactionService = transactionService;
        this.geminiApiKey = geminiApiKey;
        this.geminiModel = geminiModel;
        this.restClient = RestClient.builder()
                .baseUrl("https://generativelanguage.googleapis.com/v1beta")
                .build();
    }

    public AIInsightResponse getInsight(User user, AIInsightRequest request) {
        if (geminiApiKey == null || geminiApiKey.isBlank()) {
            throw new UnauthorizedException("Gemini API key is not configured.");
        }

        List<Transaction> transactions = transactionService.getTransactions(user, null, null);
        String prompt = buildPrompt(request.question(), transactions);

        Map<String, Object> response = restClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/models/{model}:generateContent")
                        .queryParam("key", geminiApiKey)
                        .build(geminiModel))
                .contentType(MediaType.APPLICATION_JSON)
                .body(Map.of(
                        "contents", List.of(
                                Map.of(
                                        "parts", List.of(
                                                Map.of("text", prompt)
                                        )
                                )
                        )
                ))
                .retrieve()
                .body(Map.class);

        return new AIInsightResponse(extractText(response));
    }

    private String buildPrompt(String question, List<Transaction> transactions) {
        String transactionLines = transactions.stream()
                .limit(10)
                .map(transaction -> "%s | %s | %s | %s".formatted(
                        transaction.getDate(),
                        transaction.getCategory(),
                        transaction.getName(),
                        transaction.getAmount()
                ))
                .collect(Collectors.joining("\n"));

        return """
                You are a helpful finance assistant.
                Answer briefly in plain English in 3 or 4 sentences.

                Recent transactions:
                %s

                Question:
                %s
                """.formatted(
                transactionLines.isBlank() ? "No transactions available." : transactionLines,
                question
        );
    }

    @SuppressWarnings("unchecked")
    private String extractText(Map<String, Object> response) {
        List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.get("candidates");
        if (candidates == null || candidates.isEmpty()) {
            return "No answer returned from Gemini.";
        }

        Map<String, Object> candidate = candidates.get(0);
        Map<String, Object> content = (Map<String, Object>) candidate.get("content");
        if (content == null) {
            return "Gemini returned empty content.";
        }

        List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
        if (parts == null || parts.isEmpty()) {
            return "Gemini returned no text parts.";
        }

        Object text = parts.get(0).get("text");
        return text == null ? "Gemini returned no text." : text.toString();
    }
}

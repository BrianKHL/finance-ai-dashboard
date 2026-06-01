package com.example.financialdashboard.ai;

import com.example.financialdashboard.user.User;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    private final GeminiService geminiService;

    public AIController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/insights")
    public AIInsightResponse getInsight(
            @RequestAttribute("authenticatedUser") User user,
            @Valid @RequestBody AIInsightRequest request
    ) {
        return geminiService.getInsight(user, request);
    }
}

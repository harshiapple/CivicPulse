package com.civicpulse.backend.ai.service;

import com.civicpulse.backend.ai.dto.DuplicateCheckRequest;
import com.civicpulse.backend.ai.dto.DuplicateCheckResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AIService {

    @Autowired
    private RestTemplate restTemplate;

    private static final String AI_URL =
            "http://127.0.0.1:5000/check-duplicate";

    public DuplicateCheckResponse checkDuplicate(
            DuplicateCheckRequest request) {

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<DuplicateCheckRequest> entity =
                new HttpEntity<>(request, headers);

        ResponseEntity<DuplicateCheckResponse> response =
                restTemplate.postForEntity(
                        AI_URL,
                        entity,
                        DuplicateCheckResponse.class
                );

        return response.getBody();
    }

}
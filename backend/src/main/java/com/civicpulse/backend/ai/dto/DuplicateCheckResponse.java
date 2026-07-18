package com.civicpulse.backend.ai.dto;

import lombok.Data;
import java.util.Map;

@Data
public class DuplicateCheckResponse {

    private boolean duplicate;
    private double score;

    private String category;
    private String priority;

    private Map<String, Object> matchedComplaint;
}
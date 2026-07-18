package com.civicpulse.backend.admin.dto;

import lombok.*;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticsResponse {

    private Map<String, Long> statusStats;

    private Map<String, Long> categoryStats;

    private Map<String, Long> monthlyStats;

    private List<TopCitizenDto> topCitizens;

}
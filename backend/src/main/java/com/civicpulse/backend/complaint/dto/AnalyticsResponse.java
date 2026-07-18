package com.civicpulse.backend.complaint.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticsResponse {

    // Existing
    private Map<String, Long> categoryStats;

    private Map<String, Long> monthlyStats;

    // New
    private Map<String, Long> priorityStats;

    private Map<String, Long> statusStats;

    private List<LocationStatsDto> topLocations;

    private List<SupportedComplaintDto> mostSupportedComplaints;

    private double resolutionRate;

}
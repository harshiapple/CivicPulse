package com.civicpulse.backend.dashboard.dto;

import com.civicpulse.backend.complaint.dto.ComplaintResponseDto;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {

    private long totalComplaints;
    private long pending;
    private long inProgress;
    private long resolved;
    private int rewardPoints;

    private List<ComplaintResponseDto> recentComplaints;
}
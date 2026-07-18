package com.civicpulse.backend.leaderboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LeaderboardResponseDto {

    private Long id;

    private String name;

    private Integer points;

    private Long reports;

    private String badge;

    private String nextBadge;

    private Integer pointsToNextBadge;
}
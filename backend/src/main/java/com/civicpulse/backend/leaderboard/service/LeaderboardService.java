package com.civicpulse.backend.leaderboard.service;

import com.civicpulse.backend.leaderboard.dto.LeaderboardResponseDto;

import java.util.List;

public interface LeaderboardService {

    List<LeaderboardResponseDto> getLeaderboard();

}
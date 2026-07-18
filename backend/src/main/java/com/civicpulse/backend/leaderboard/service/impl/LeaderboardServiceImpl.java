package com.civicpulse.backend.leaderboard.service.impl;

import com.civicpulse.backend.complaint.repository.ComplaintRepository;
import com.civicpulse.backend.entity.User;
import com.civicpulse.backend.leaderboard.dto.LeaderboardResponseDto;
import com.civicpulse.backend.leaderboard.service.LeaderboardService;
import com.civicpulse.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LeaderboardServiceImpl
        implements LeaderboardService {

    private final UserRepository userRepository;

    private final ComplaintRepository complaintRepository;

    @Override
    public List<LeaderboardResponseDto> getLeaderboard() {

        return userRepository
                .findAllByOrderByPointsDesc()
                .stream()
                .map(user -> {

                    long reports =
                            complaintRepository.countByUser(user);

                    String badge;
                    String nextBadge;
                    int remaining;

                    if(user.getPoints() >= 100){

                        badge="Gold";
                        nextBadge="Maximum Level";
                        remaining=0;

                    }
                    else if(user.getPoints()>=50){

                        badge="Silver";
                        nextBadge="Gold";
                        remaining=100-user.getPoints();

                    }
                    else{

                        badge="Bronze";
                        nextBadge="Silver";
                        remaining=50-user.getPoints();

                    }
                    return LeaderboardResponseDto.builder()

                            .id(user.getId())
                            .name(user.getName())
                            .points(user.getPoints())
                            .reports(reports)
                            .badge(badge)
                            .nextBadge(nextBadge)
                            .pointsToNextBadge(remaining)

                            .build();

                })
                .toList();

    }

}
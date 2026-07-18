package com.civicpulse.backend.dashboard.service.impl;

import com.civicpulse.backend.complaint.dto.ComplaintResponseDto;
import com.civicpulse.backend.complaint.entity.Complaint;
import com.civicpulse.backend.complaint.entity.ComplaintStatus;
import com.civicpulse.backend.complaint.mapper.ComplaintMapper;
import com.civicpulse.backend.complaint.repository.ComplaintRepository;
import com.civicpulse.backend.dashboard.dto.DashboardResponse;
import com.civicpulse.backend.dashboard.service.DashboardService;
import com.civicpulse.backend.entity.User;
import com.civicpulse.backend.exception.ResourceNotFoundException;
import com.civicpulse.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;

    @Override
    public DashboardResponse getDashboard() {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        List<Complaint> complaints =
                complaintRepository.findByUser(user);

        List<ComplaintResponseDto> recent =
                complaints.stream()
                        .sorted(Comparator.comparing(Complaint::getCreatedAt).reversed())
                        .limit(5)
                        .map(ComplaintMapper::toDto)
                        .toList();

        return DashboardResponse.builder()
                .totalComplaints(complaints.size())
                .pending(
                        complaints.stream()
                                .filter(c -> c.getStatus() == ComplaintStatus.PENDING)
                                .count())
                .inProgress(
                        complaints.stream()
                                .filter(c -> c.getStatus() == ComplaintStatus.IN_PROGRESS)
                                .count())
                .resolved(
                        complaints.stream()
                                .filter(c -> c.getStatus() == ComplaintStatus.RESOLVED)
                                .count())
                .rewardPoints(user.getPoints())
                .recentComplaints(recent)
                .build();
    }
}
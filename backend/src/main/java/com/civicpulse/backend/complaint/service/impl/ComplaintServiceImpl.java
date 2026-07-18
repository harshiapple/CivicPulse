package com.civicpulse.backend.complaint.service.impl;

import org.springframework.transaction.annotation.Transactional;
import java.util.LinkedHashMap;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.List;

import com.civicpulse.backend.complaint.dto.AnalyticsResponse;
import com.civicpulse.backend.ai.dto.DuplicateCheckRequest;
import com.civicpulse.backend.ai.dto.DuplicateCheckResponse;
import com.civicpulse.backend.ai.dto.ExistingComplaintDto;
import com.civicpulse.backend.ai.service.AIService;
import com.civicpulse.backend.complaint.dto.ReportComplaintRequest;
import com.civicpulse.backend.complaint.entity.Complaint;
import com.civicpulse.backend.complaint.entity.ComplaintStatus;
import com.civicpulse.backend.complaint.entity.Priority;
import com.civicpulse.backend.complaint.repository.ComplaintRepository;
import com.civicpulse.backend.complaint.service.ComplaintService;
import com.civicpulse.backend.dto.response.ApiResponse;
import com.civicpulse.backend.entity.User;
import com.civicpulse.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.civicpulse.backend.complaint.dto.ComplaintResponseDto;
import com.civicpulse.backend.complaint.mapper.ComplaintMapper;
import java.time.LocalDateTime;
import com.civicpulse.backend.complaint.entity.ComplaintStatus;
import com.civicpulse.backend.complaint.dto.UpdateComplaintStatusRequest;

import com.civicpulse.backend.complaint.entity.ComplaintSupport;
import com.civicpulse.backend.complaint.repository.ComplaintSupportRepository;
import com.civicpulse.backend.exception.ResourceNotFoundException;
import com.civicpulse.backend.exception.BadRequestException;
import com.civicpulse.backend.exception.DuplicateSupportException;
import com.civicpulse.backend.exception.UnauthorizedException;
import java.util.Map;


import java.util.List;

import java.time.LocalDateTime;
import org.springframework.web.multipart.MultipartFile;
import com.civicpulse.backend.service.FileStorageService;
import java.util.HashMap;
import java.util.Map;
import java.time.Month;
import com.civicpulse.backend.notification.service.NotificationService;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import com.civicpulse.backend.complaint.dto.LocationStatsDto;
import com.civicpulse.backend.complaint.dto.SupportedComplaintDto;
import com.civicpulse.backend.complaint.entity.Complaint;
import com.civicpulse.backend.complaint.entity.ComplaintStatus;
import com.civicpulse.backend.complaint.entity.Priority;

import java.util.LinkedHashMap;
import java.util.ArrayList;
import java.nio.charset.StandardCharsets;
import java.util.List;
import com.civicpulse.backend.notification.service.NotificationService;

@Service
@RequiredArgsConstructor
public class ComplaintServiceImpl implements ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;
    private final ComplaintSupportRepository complaintSupportRepository;
    private final AIService aiService;
    private final NotificationService notificationService;
    private final FileStorageService fileStorageService;


    @Override
    public ApiResponse reportComplaint(
            ReportComplaintRequest request,
            MultipartFile image) {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        List<ExistingComplaintDto> existingComplaints =
                complaintRepository.findAll()
                        .stream()
                        .map(c -> ExistingComplaintDto.builder()
                                .id(c.getId())
                                .title(c.getTitle())
                                .description(c.getDescription())
                                .location(c.getLocation())
                                .build())
                        .toList();

        DuplicateCheckRequest aiRequest =
                DuplicateCheckRequest.builder()
                        .title(request.getTitle())
                        .description(request.getDescription())
                        .location(request.getLocation())
                        .existing(existingComplaints)
                        .build();

        DuplicateCheckResponse aiResponse =
                aiService.checkDuplicate(aiRequest);

        if (aiResponse.isDuplicate()
                && !Boolean.TRUE.equals(request.getSubmitAnyway())) {

            return ApiResponse.builder()
                    .success(false)
                    .message("Similar complaint found")
                    .data(aiResponse)
                    .timestamp(LocalDateTime.now())
                    .build();
        }

        Complaint complaint = Complaint.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .location(request.getLocation())
                .imageUrl(
                        image != null && !image.isEmpty()
                                ? fileStorageService.saveFile(image)
                                : null
                )
                .category(aiResponse.getCategory())
                .priority(Priority.valueOf(aiResponse.getPriority()))
                .status(ComplaintStatus.PENDING)
//                .duplicateScore(aiResponse.getScore())
                .duplicateScore(aiResponse.getScore())
                .duplicateComplaintId(
                        aiResponse.getMatchedComplaint() == null
                                ? null
                                : Long.valueOf(aiResponse.getMatchedComplaint().get("id").toString())
                )
                .supportCount(0)
                .user(user)
                .createdAt(LocalDateTime.now())
                .build();

        complaintRepository.save(complaint);

        user.setPoints(user.getPoints() + 10);

        userRepository.save(user);

        notificationService.createNotification(
                user,
                "📝 Complaint submitted successfully. You earned +10 Civic Points."
        );

        return ApiResponse.builder()
                .success(true)
                .message("Complaint Submitted Successfully")
                .data(ComplaintMapper.toDto(complaint))
                .timestamp(LocalDateTime.now())
                .build();
    }
    @Override
    public List<ComplaintResponseDto> getMyComplaints() {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return complaintRepository.findByUser(user)
                .stream()
                .map(ComplaintMapper::toDto)
                .toList();
    }
    @Override
    public ComplaintResponseDto getComplaintById(Long complaintId) {

        // Get logged-in user's email
        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        // Fetch logged-in user
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Fetch complaint
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found"));

        // Check ownership
        if (!complaint.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedException("You are not authorized to view this complaint.");
        }

        return ComplaintMapper.toDto(complaint);
    }
    @Override
    public ComplaintResponseDto supportComplaint(Long complaintId) {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->new ResourceNotFoundException("User not found"));

        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found"));

        if (complaint.getUser().getId().equals(user.getId())) {
            throw new BadRequestException("You cannot support your own complaint.");
        }

        if (complaintSupportRepository.existsByComplaintAndUser(complaint, user)) {
            throw new DuplicateSupportException("You have already supported this complaint.");
        }

        ComplaintSupport support = ComplaintSupport.builder()
                .complaint(complaint)
                .user(user)
                .supportedAt(LocalDateTime.now())
                .build();

        complaintSupportRepository.save(support);

        complaint.setSupportCount(complaint.getSupportCount() + 1);

        complaintRepository.save(complaint);
        user.setPoints(user.getPoints() + 2);

        userRepository.save(user);
        notificationService.createNotification(
                user,
                "👍 Thank you for supporting an existing complaint. You earned +2 Civic Points."
        );

        return ComplaintMapper.toDto(complaint);
    }
    @Override
    public List<ComplaintResponseDto> getAllComplaints() {

        return complaintRepository.findAll()
                .stream()
                .map(ComplaintMapper::toDto)
                .toList();
    }
    @Override
    public ComplaintResponseDto updateComplaintStatus(
            Long complaintId,
            UpdateComplaintStatusRequest request) {

        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Complaint not found"));

        complaint.setStatus(request.getStatus());

        complaintRepository.save(complaint);
        if (request.getStatus() == ComplaintStatus.RESOLVED) {

            User complaintOwner = complaint.getUser();

            complaintOwner.setPoints(
                    complaintOwner.getPoints() + 20
            );

            userRepository.save(complaintOwner);
        }

        String message;

        switch (request.getStatus()) {

            case IN_PROGRESS ->
                    message = "🚧 Your complaint \"" + complaint.getTitle()
                            + "\" is now under progress.";

            case RESOLVED ->
                    message = "✅ Your complaint \"" + complaint.getTitle()
                            + "\" has been resolved.";

            case PENDING ->
                    message = "📌 Your complaint \"" + complaint.getTitle()
                            + "\" is pending review.";

            default ->
                    message = "Your complaint status has been updated.";
        }

        notificationService.createNotification(
                complaint.getUser(),
                message
        );
        return ComplaintMapper.toDto(complaint);
    }
    @Override
    public List<ComplaintResponseDto> getComplaintsByStatus(
            ComplaintStatus status) {

        return complaintRepository.findByStatus(status)
                .stream()
                .map(ComplaintMapper::toDto)
                .toList();
    }
    @Override
    public long getTotalComplaints() {
        return complaintRepository.count();
    }
    @Override
    public long getPendingComplaints() {
        return complaintRepository.countByStatus(
                ComplaintStatus.PENDING);
    }
    @Override
    public long getResolvedComplaints() {
        return complaintRepository.countByStatus(
                ComplaintStatus.RESOLVED);
    }
    @Override
    public long getInProgressComplaints() {
        return complaintRepository.countByStatus(
                ComplaintStatus.IN_PROGRESS);
    }
    @Override
    @Transactional
    public void deleteComplaint(Long complaintId) {

        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Complaint not found"));

        complaintSupportRepository.deleteByComplaint(complaint);

        complaintRepository.delete(complaint);
    }
    @Override
    public Map<String, Long> getCategoryStatistics() {

        List<Object[]> results = complaintRepository.getCategoryStatistics();

        Map<String, Long> statistics = new HashMap<>();

        for (Object[] row : results) {

            String category = (String) row[0];
            Long count = (Long) row[1];

            statistics.put(category, count);
        }

        return statistics;
    }
    @Override
    public Map<String, Long> getMonthlyComplaintStatistics() {

        List<Object[]> results = complaintRepository.getMonthlyComplaintStatistics();

        Map<String, Long> statistics = new LinkedHashMap<>();

        for (Object[] row : results) {

            Integer monthNumber = (Integer) row[0];
            Long count = (Long) row[1];

            String monthName = Month.of(monthNumber).name();

            statistics.put(monthName, count);
        }

        return statistics;
    }
    @Override
    public AnalyticsResponse getAnalytics() {

    /*
        CATEGORY STATS
     */

        Map<String, Long> categoryMap = new LinkedHashMap<>();

        List<Object[]> categoryStats =
                complaintRepository.getCategoryStatistics();

        for (Object[] row : categoryStats) {

            categoryMap.put(
                    row[0].toString(),
                    (Long) row[1]
            );
        }

    /*
        MONTHLY STATS
     */

        Map<String, Long> monthlyMap = new LinkedHashMap<>();

        List<Object[]> monthlyStats =
                complaintRepository.getMonthlyComplaintStatistics();

        String[] months = {
                "",
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
        };

        for (Object[] row : monthlyStats) {

            Integer month = (Integer) row[0];

            monthlyMap.put(
                    months[month],
                    (Long) row[1]
            );
        }

    /*
        PRIORITY STATS
     */

        Map<String, Long> priorityMap = new LinkedHashMap<>();

        List<Object[]> priorityStats =
                complaintRepository.getPriorityStatistics();

        for (Object[] row : priorityStats) {

            priorityMap.put(
                    row[0].toString(),
                    (Long) row[1]
            );
        }

    /*
        STATUS STATS
     */

        Map<String, Long> statusMap = new LinkedHashMap<>();

        List<Object[]> statusStats =
                complaintRepository.getStatusStatistics();

        for (Object[] row : statusStats) {

            statusMap.put(
                    row[0].toString(),
                    (Long) row[1]
            );
        }

    /*
        TOP LOCATIONS
     */

        List<LocationStatsDto> topLocations =
                new ArrayList<>();

        List<Object[]> locations =
                complaintRepository.getTopLocations();

        int limit = Math.min(5, locations.size());

        for (int i = 0; i < limit; i++) {

            Object[] row = locations.get(i);

            topLocations.add(

                    new LocationStatsDto(

                            row[0].toString(),

                            (Long) row[1]
                    )
            );

        }

    /*
        MOST SUPPORTED
     */

        List<SupportedComplaintDto> supported =
                new ArrayList<>();

        List<Complaint> complaints =
                complaintRepository.findTopSupportedComplaints();

        limit = Math.min(5, complaints.size());

        for (int i = 0; i < limit; i++) {

            Complaint complaint =
                    complaints.get(i);

            supported.add(

                    new SupportedComplaintDto(

                            complaint.getId(),

                            complaint.getTitle(),

                            complaint.getSupportCount()

                    )

            );

        }

    /*
        RESOLUTION RATE
     */

        long total =
                complaintRepository.count();

        long resolved =
                complaintRepository.countByStatus(
                        ComplaintStatus.RESOLVED
                );

        double resolutionRate = 0;

        if (total != 0) {

            resolutionRate =
                    (resolved * 100.0) / total;

        }

    /*
        RESPONSE
     */

        return AnalyticsResponse.builder()

                .categoryStats(categoryMap)

                .monthlyStats(monthlyMap)

                .priorityStats(priorityMap)

                .statusStats(statusMap)

                .topLocations(topLocations)

                .mostSupportedComplaints(supported)

                .resolutionRate(
                        Math.round(
                                resolutionRate * 100
                        ) / 100.0
                )

                .build();

    }
    @Override
    public Map<String, Long> getTodaySummary() {

        LocalDateTime today =
                LocalDate.now().atStartOfDay();

        Map<String, Long> summary = new HashMap<>();

        summary.put(
                "newReports",
                complaintRepository.countByCreatedAtAfter(today)
        );

        summary.put(
                "resolved",
                complaintRepository.countByCreatedAtAfterAndStatus(
                        today,
                        ComplaintStatus.RESOLVED
                )
        );

        summary.put(
                "pending",
                complaintRepository.countByCreatedAtAfterAndStatus(
                        today,
                        ComplaintStatus.PENDING
                )
        );

        summary.put(
                "inProgress",
                complaintRepository.countByCreatedAtAfterAndStatus(
                        today,
                        ComplaintStatus.IN_PROGRESS
                )
        );

        return summary;
    }
    @Override
    public List<ComplaintResponseDto> getRecentComplaints() {

        return complaintRepository
                .findTop5ByOrderByCreatedAtDesc()
                .stream()
                .map(ComplaintMapper::toDto)
                .toList();
    }
    @Override
    public byte[] exportComplaintsCsv() {

        List<Complaint> complaints = complaintRepository.findAll();

        StringBuilder csv = new StringBuilder();

        csv.append("Id,Title,Category,Location,Priority,Status,Support Count\n");

        for (Complaint complaint : complaints) {

            csv.append(complaint.getId()).append(",");

            csv.append("\"")
                    .append(complaint.getTitle())
                    .append("\"")
                    .append(",");

            csv.append(complaint.getCategory()).append(",");

            csv.append("\"")
                    .append(complaint.getLocation())
                    .append("\"")
                    .append(",");

            csv.append(complaint.getPriority()).append(",");

            csv.append(complaint.getStatus()).append(",");

            csv.append(complaint.getSupportCount());

            csv.append("\n");

        }

        return csv.toString().getBytes(StandardCharsets.UTF_8);

    }
}
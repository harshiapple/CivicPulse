package com.civicpulse.backend.complaint.service;

import com.civicpulse.backend.complaint.dto.ReportComplaintRequest;
import com.civicpulse.backend.dto.response.ApiResponse;
import java.util.List;
import java.util.Map;

import com.civicpulse.backend.complaint.dto.ComplaintResponseDto;
import com.civicpulse.backend.complaint.dto.UpdateComplaintStatusRequest;
import com.civicpulse.backend.complaint.entity.ComplaintStatus;
import org.springframework.web.multipart.MultipartFile;
import com.civicpulse.backend.complaint.dto.AnalyticsResponse;


public interface ComplaintService {

    ApiResponse reportComplaint(
            ReportComplaintRequest request,
            MultipartFile image);
    List<ComplaintResponseDto> getMyComplaints();
    ComplaintResponseDto getComplaintById(Long complaintId);
    ComplaintResponseDto supportComplaint(Long complaintId);
    List<ComplaintResponseDto> getAllComplaints();
    ComplaintResponseDto updateComplaintStatus(
            Long complaintId,
            UpdateComplaintStatusRequest request);

    List<ComplaintResponseDto> getComplaintsByStatus(
            ComplaintStatus status);

    long getTotalComplaints();

    long getPendingComplaints();

    long getResolvedComplaints();

    long getInProgressComplaints();

    void deleteComplaint(Long complaintId);
    Map<String, Long> getCategoryStatistics();
    Map<String, Long> getMonthlyComplaintStatistics();
    AnalyticsResponse getAnalytics();
    Map<String, Long> getTodaySummary();
    List<ComplaintResponseDto> getRecentComplaints();
    byte[] exportComplaintsCsv();
}

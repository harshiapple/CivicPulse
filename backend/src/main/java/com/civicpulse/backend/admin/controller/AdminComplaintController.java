package com.civicpulse.backend.admin.controller;

import com.civicpulse.backend.complaint.dto.ComplaintResponseDto;
import com.civicpulse.backend.complaint.dto.UpdateComplaintStatusRequest;
import com.civicpulse.backend.complaint.entity.ComplaintStatus;
import com.civicpulse.backend.complaint.service.ComplaintService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.civicpulse.backend.complaint.dto.AnalyticsResponse;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

@RestController
@RequestMapping("/api/admin/complaints")
@RequiredArgsConstructor
public class AdminComplaintController {

    private final ComplaintService complaintService;
//    private final AdminComplaintService adminComplaintService;
    @GetMapping
    public ResponseEntity<List<ComplaintResponseDto>> getAllComplaints() {

        return ResponseEntity.ok(
                complaintService.getAllComplaints());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ComplaintResponseDto> updateStatus(

            @PathVariable Long id,

            @RequestBody UpdateComplaintStatusRequest request) {

        return ResponseEntity.ok(

                complaintService.updateComplaintStatus(id, request));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<ComplaintResponseDto>> getByStatus(

            @PathVariable ComplaintStatus status) {

        return ResponseEntity.ok(

                complaintService.getComplaintsByStatus(status));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteComplaint(
            @PathVariable Long id) {

        complaintService.deleteComplaint(id);

        return ResponseEntity.ok("Complaint deleted successfully.");
    }

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Long>> dashboard() {

        Map<String, Long> data = new HashMap<>();

        data.put("Total Complaints",
                complaintService.getTotalComplaints());

        data.put("Pending",
                complaintService.getPendingComplaints());

        data.put("In Progress",
                complaintService.getInProgressComplaints());

        data.put("Resolved",
                complaintService.getResolvedComplaints());

        return ResponseEntity.ok(data);
    }

    @GetMapping("/categories")
    public ResponseEntity<Map<String, Long>> getCategoryStatistics() {

        return ResponseEntity.ok(
                complaintService.getCategoryStatistics()
        );
    }
    @GetMapping("/monthly")
    public ResponseEntity<Map<String, Long>> getMonthlyStatistics() {

        return ResponseEntity.ok(
                complaintService.getMonthlyComplaintStatistics()
        );
    }
//    @GetMapping("/analytics")
//    public AnalyticsResponse getAnalytics() {
//        return adminService.getAnalytics();
//    }
    @GetMapping("/analytics")
    public AnalyticsResponse analytics() {

        return complaintService.getAnalytics();

    }
    @GetMapping("/today-summary")
    public ResponseEntity<Map<String, Long>> todaySummary() {

        return ResponseEntity.ok(
                complaintService.getTodaySummary()
        );
    }
    @GetMapping("/recent")
    public ResponseEntity<List<ComplaintResponseDto>> recentComplaints() {

        return ResponseEntity.ok(
                complaintService.getRecentComplaints()
        );

    }
    @GetMapping("/export")
    public ResponseEntity<byte[]> exportCsv() {

        byte[] csv = complaintService.exportComplaintsCsv();

        return ResponseEntity.ok()

                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=complaints.csv"
                )

                .contentType(MediaType.APPLICATION_OCTET_STREAM)

                .body(csv);

    }

}
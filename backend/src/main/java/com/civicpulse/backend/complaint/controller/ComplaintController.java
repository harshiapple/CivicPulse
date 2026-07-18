package com.civicpulse.backend.complaint.controller;

import com.civicpulse.backend.complaint.dto.ReportComplaintRequest;
import com.civicpulse.backend.complaint.service.ComplaintService;
import com.civicpulse.backend.dto.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.civicpulse.backend.complaint.dto.ComplaintResponseDto;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/complaints")
@RequiredArgsConstructor
public class ComplaintController {

    private final ComplaintService complaintService;

    @PostMapping(consumes = "multipart/form-data")
    public ApiResponse reportComplaint(
            @RequestPart("complaint") @Valid ReportComplaintRequest request,
            @RequestPart(value = "image", required = false) MultipartFile image) {

        return complaintService.reportComplaint(request, image);
    }
    @GetMapping("/my")
    public ResponseEntity<List<ComplaintResponseDto>> getMyComplaints() {
        return ResponseEntity.ok(complaintService.getMyComplaints());
    }
    @GetMapping("/{id}")
    public ResponseEntity<ComplaintResponseDto> getComplaintById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                complaintService.getComplaintById(id)
        );
    }
    @PostMapping("/{id}/support")
    public ResponseEntity<ComplaintResponseDto> supportComplaint(@PathVariable Long id) {

        return ResponseEntity.ok(
                complaintService.supportComplaint(id)
        );
    }
}
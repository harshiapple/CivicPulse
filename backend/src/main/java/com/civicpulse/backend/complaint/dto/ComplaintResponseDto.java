package com.civicpulse.backend.complaint.dto;
import com.civicpulse.backend.complaint.entity.Priority;

import com.civicpulse.backend.complaint.entity.ComplaintStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ComplaintResponseDto {

    private Long id;

    private String title;

    private String description;

    private String location;

    private ComplaintStatus status;

    private LocalDateTime createdAt;
    private Integer supportCount;
    private String category;

    private Priority priority;

    private String citizenName;
    private String imageUrl;
}
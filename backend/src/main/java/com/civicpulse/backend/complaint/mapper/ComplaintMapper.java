package com.civicpulse.backend.complaint.mapper;

import com.civicpulse.backend.complaint.dto.ComplaintResponseDto;
import com.civicpulse.backend.complaint.entity.Complaint;

public class ComplaintMapper {

    private ComplaintMapper() {
    }

    public static ComplaintResponseDto toDto(Complaint complaint) {
        return ComplaintResponseDto.builder()
                .id(complaint.getId())
                .title(complaint.getTitle())
                .description(complaint.getDescription())
                .location(complaint.getLocation())
                .status(complaint.getStatus())
                .category(complaint.getCategory())
                .priority(complaint.getPriority())
                .supportCount(complaint.getSupportCount())
                .createdAt(complaint.getCreatedAt())
                .build();


    }
}
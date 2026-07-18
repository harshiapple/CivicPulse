package com.civicpulse.backend.complaint.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SupportedComplaintDto {

    private Long id;

    private String title;

    private Integer supportCount;

}
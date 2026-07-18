package com.civicpulse.backend.complaint.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LocationStatsDto {

    private String location;

    private Long count;

}
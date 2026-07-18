package com.civicpulse.backend.ai.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DuplicateCheckRequest {

    private String title;

    private String description;

    private String location;

    private List<ExistingComplaintDto> existing;

}
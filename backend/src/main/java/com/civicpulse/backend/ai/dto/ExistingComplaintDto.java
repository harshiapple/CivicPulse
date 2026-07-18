package com.civicpulse.backend.ai.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExistingComplaintDto {

    private Long id;

    private String title;

    private String description;

    private String location;

}
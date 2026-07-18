package com.civicpulse.backend.admin.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TopCitizenDto {

    private String name;

    private Integer points;

}
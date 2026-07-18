package com.civicpulse.backend.user.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileResponseDto {

    private Long id;

    private String name;

    private String email;

    private String role;

    private Integer points;

    private String phone;

    private String address;

    private Long reportsSubmitted;

    private Long reportsResolved;

    private Long reportsPending;

}
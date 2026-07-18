package com.civicpulse.backend.profile.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileResponseDto {

    private Long id;

    private String name;

    private String email;

    private String phone;

    private String address;

    private String role;

    private Integer points;

    private String badge;

    private Long reportsSubmitted;

    private Long reportsResolved;

    private Long reportsPending;

    private String profileImage;

}
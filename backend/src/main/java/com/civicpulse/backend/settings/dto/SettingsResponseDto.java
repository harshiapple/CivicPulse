package com.civicpulse.backend.settings.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SettingsResponseDto {

    private Boolean emailNotifications;

    private Boolean pushNotifications;

    private Boolean publicProfile;

    private Boolean locationSharing;

    private String theme;

    private String language;

}
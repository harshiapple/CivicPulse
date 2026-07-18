package com.civicpulse.backend.settings.dto;

import lombok.Data;

@Data
public class UpdateSettingsRequest {

    private Boolean emailNotifications;

    private Boolean pushNotifications;

    private Boolean publicProfile;

    private Boolean locationSharing;

    private String theme;

    private String language;

}
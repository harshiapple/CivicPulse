package com.civicpulse.backend.settings.service;

import com.civicpulse.backend.settings.dto.SettingsResponseDto;
import com.civicpulse.backend.settings.dto.UpdateSettingsRequest;

public interface SettingsService {

    SettingsResponseDto getSettings();

    SettingsResponseDto updateSettings(
            UpdateSettingsRequest request);

}
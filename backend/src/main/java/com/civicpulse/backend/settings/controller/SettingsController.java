package com.civicpulse.backend.settings.controller;

import com.civicpulse.backend.settings.dto.SettingsResponseDto;
import com.civicpulse.backend.settings.dto.UpdateSettingsRequest;
import com.civicpulse.backend.settings.service.SettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/settings")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class SettingsController {

    private final SettingsService settingsService;

    @GetMapping
    public SettingsResponseDto getSettings() {

        return settingsService.getSettings();

    }

    @PutMapping
    public SettingsResponseDto updateSettings(
            @RequestBody UpdateSettingsRequest request) {

        return settingsService.updateSettings(request);

    }

}
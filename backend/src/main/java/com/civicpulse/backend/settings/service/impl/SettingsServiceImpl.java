package com.civicpulse.backend.settings.service.impl;

import com.civicpulse.backend.entity.User;
import com.civicpulse.backend.exception.ResourceNotFoundException;
import com.civicpulse.backend.repository.UserRepository;
import com.civicpulse.backend.settings.dto.SettingsResponseDto;
import com.civicpulse.backend.settings.dto.UpdateSettingsRequest;
import com.civicpulse.backend.settings.entity.Settings;
import com.civicpulse.backend.settings.repository.SettingsRepository;
import com.civicpulse.backend.settings.service.SettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SettingsServiceImpl implements SettingsService {

    private final SettingsRepository settingsRepository;
    private final UserRepository userRepository;

    @Override
    public SettingsResponseDto getSettings() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Settings settings = settingsRepository
                .findByUser(user)
                .orElseGet(() -> {

                    Settings newSettings = Settings.builder()
                            .user(user)
                            .emailNotifications(true)
                            .pushNotifications(true)
                            .publicProfile(true)
                            .locationSharing(true)
                            .theme("Light")
                            .language("English")
                            .build();

                    return settingsRepository.save(newSettings);

                });

        return mapToDto(settings);

    }

    @Override
    public SettingsResponseDto updateSettings(UpdateSettingsRequest request) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Settings settings = settingsRepository
                .findByUser(user)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Settings not found"));

        if (request.getEmailNotifications() != null) {
            settings.setEmailNotifications(
                    request.getEmailNotifications());
        }

        if (request.getPushNotifications() != null) {
            settings.setPushNotifications(
                    request.getPushNotifications());
        }

        if (request.getPublicProfile() != null) {
            settings.setPublicProfile(
                    request.getPublicProfile());
        }

        if (request.getLocationSharing() != null) {
            settings.setLocationSharing(
                    request.getLocationSharing());
        }

        if (request.getTheme() != null) {
            settings.setTheme(request.getTheme());
        }

        if (request.getLanguage() != null) {
            settings.setLanguage(request.getLanguage());
        }

        settingsRepository.save(settings);

        return mapToDto(settings);

    }

    private SettingsResponseDto mapToDto(Settings settings) {

        return SettingsResponseDto.builder()
                .emailNotifications(settings.getEmailNotifications())
                .pushNotifications(settings.getPushNotifications())
                .publicProfile(settings.getPublicProfile())
                .locationSharing(settings.getLocationSharing())
                .theme(settings.getTheme())
                .language(settings.getLanguage())
                .build();

    }

}
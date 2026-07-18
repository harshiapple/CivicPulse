package com.civicpulse.backend.profile.service;

import com.civicpulse.backend.profile.dto.ProfileResponseDto;
import com.civicpulse.backend.profile.dto.UpdateProfileRequest;
import org.springframework.web.multipart.MultipartFile;

public interface ProfileService {

    ProfileResponseDto getProfile();

    ProfileResponseDto updateProfile(UpdateProfileRequest request);
    String uploadPhoto(MultipartFile file);
}
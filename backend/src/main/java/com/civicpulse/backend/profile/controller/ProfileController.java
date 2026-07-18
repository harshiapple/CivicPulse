package com.civicpulse.backend.profile.controller;

import com.civicpulse.backend.profile.dto.ProfileResponseDto;
import com.civicpulse.backend.profile.dto.UpdateProfileRequest;
import com.civicpulse.backend.profile.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping
    public ProfileResponseDto getProfile() {
        return profileService.getProfile();
    }

    @PutMapping
    public ProfileResponseDto updateProfile(
            @RequestBody UpdateProfileRequest request
    ) {
        return profileService.updateProfile(request);
    }
    @PostMapping("/photo")
    public ResponseEntity<?> uploadPhoto(
            @RequestParam("file") MultipartFile file
    ) {

        String imageUrl = profileService.uploadPhoto(file);

        return ResponseEntity.ok(imageUrl);
    }

}
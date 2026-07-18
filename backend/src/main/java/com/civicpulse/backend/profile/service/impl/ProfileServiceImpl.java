package com.civicpulse.backend.profile.service.impl;

import com.civicpulse.backend.complaint.entity.ComplaintStatus;
import com.civicpulse.backend.complaint.repository.ComplaintRepository;
import com.civicpulse.backend.entity.User;
import com.civicpulse.backend.exception.ResourceNotFoundException;
import com.civicpulse.backend.profile.dto.ProfileResponseDto;
import com.civicpulse.backend.profile.dto.UpdateProfileRequest;
import com.civicpulse.backend.profile.service.ProfileService;
import com.civicpulse.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final UserRepository userRepository;
    private final ComplaintRepository complaintRepository;

    @Override
    public ProfileResponseDto getProfile() {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        long submitted = complaintRepository.countByUser(user);

        long resolved = complaintRepository.countByUserAndStatus(
                user,
                ComplaintStatus.RESOLVED
        );

        long pending = complaintRepository.countByUserAndStatus(
                user,
                ComplaintStatus.PENDING
        );

        String badge;

        if (user.getPoints() >= 100) {
            badge = "Gold";
        } else if (user.getPoints() >= 50) {
            badge = "Silver";
        } else {
            badge = "Bronze";
        }

        return ProfileResponseDto.builder()
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .address(user.getAddress())
                .role(user.getRole().name())
                .points(user.getPoints())
                .badge(badge)
                .reportsSubmitted(submitted)
                .reportsResolved(resolved)
                .reportsPending(pending)
                .profileImage(user.getProfileImage())
                .build();
    }

    @Override
    public ProfileResponseDto updateProfile(UpdateProfileRequest request) {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        user.setName(request.getName());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());

        userRepository.save(user);

        return getProfile();
    }
    @Override
    public String uploadPhoto(MultipartFile file) {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));


        try {

            String uploadDir = "uploads/profile/";

            Files.createDirectories(Paths.get(uploadDir));


            String fileName = UUID.randomUUID()
                    + "_"
                    + file.getOriginalFilename();


            Path filePath = Paths.get(uploadDir + fileName);


            Files.copy(
                    file.getInputStream(),
                    filePath,
                    StandardCopyOption.REPLACE_EXISTING
            );


            user.setProfileImage(fileName);

            userRepository.save(user);


            return fileName;


        } catch (IOException e) {

            throw new RuntimeException(
                    "Failed to upload image"
            );
        }
    }
}
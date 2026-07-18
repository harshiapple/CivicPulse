package com.civicpulse.backend.service.impl;

import com.civicpulse.backend.dto.request.LoginRequest;
import com.civicpulse.backend.dto.request.RegisterRequest;
import com.civicpulse.backend.dto.response.LoginResponse;
import com.civicpulse.backend.entity.User;
import com.civicpulse.backend.entity.enums.Role;
import com.civicpulse.backend.repository.UserRepository;
import com.civicpulse.backend.security.JwtService;
import com.civicpulse.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.civicpulse.backend.exception.ResourceNotFoundException;
import com.civicpulse.backend.user.dto.ChangePasswordRequest;

import com.civicpulse.backend.complaint.repository.ComplaintRepository;
import com.civicpulse.backend.complaint.entity.ComplaintStatus;
import java.time.LocalDateTime;
import com.civicpulse.backend.exception.BadRequestException;
import com.civicpulse.backend.user.dto.ProfileResponseDto;
import com.civicpulse.backend.user.dto.UpdateProfileRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import com.civicpulse.backend.notification.service.NotificationService;
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final ComplaintRepository complaintRepository;
    private final NotificationService notificationService;

    @Override
    public String register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already registered!";
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .address(request.getAddress())
                .role(Role.CITIZEN)
                .points(0)
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(user);
        notificationService.createNotification(
                user,
                "🎉 Welcome to CivicPulse! Start reporting civic issues and earn rewards."
        );

        return "Registration Successful";
    }

    @Override
    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new BadRequestException("Invalid Email"));

        // Check if account is disabled
        if (!user.isEnabled()) {
            throw new BadRequestException(
                    "This account has been deleted or disabled."
            );
        }

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new BadRequestException("Invalid Password");
        }

        String token = jwtService.generateToken(user);

        return new LoginResponse(
                user.getEmail(),
                user.getRole().name(),
                token,
                "Login Successful"
        );
    }
    @Override
    public ProfileResponseDto getProfile() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        long total =
                complaintRepository.countByUser(user);

        long resolved =
                complaintRepository.countByUserAndStatus(
                        user,
                        ComplaintStatus.RESOLVED
                );

        long pending =
                complaintRepository.countByUserAndStatus(
                        user,
                        ComplaintStatus.PENDING
                );

        return ProfileResponseDto.builder()

                .id(user.getId())

                .name(user.getName())

                .email(user.getEmail())

                .role(user.getRole().name())

                .points(user.getPoints())

                .phone(user.getPhone())

                .address(user.getAddress())

                .reportsSubmitted(total)

                .reportsResolved(resolved)

                .reportsPending(pending)

                .build();

    }

    @Override
    public ProfileResponseDto updateProfile(UpdateProfileRequest request) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());

        userRepository.save(user);

        return getProfile();
    }
    @Override
    public void changePassword(ChangePasswordRequest request) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        if (!passwordEncoder.matches(
                request.getCurrentPassword(),
                user.getPassword())) {

            throw new BadRequestException("Current password is incorrect.");

        }

        user.setPassword(
                passwordEncoder.encode(
                        request.getNewPassword()
                )
        );

        userRepository.save(user);

    }
    @Override
    public void deleteAccount() {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        user.setEnabled(false);

        userRepository.save(user);
    }
}
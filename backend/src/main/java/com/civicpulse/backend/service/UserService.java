package com.civicpulse.backend.service;

import com.civicpulse.backend.dto.request.LoginRequest;
import com.civicpulse.backend.dto.request.RegisterRequest;
import com.civicpulse.backend.dto.response.LoginResponse;
import com.civicpulse.backend.user.dto.ProfileResponseDto;
import com.civicpulse.backend.user.dto.UpdateProfileRequest;
import com.civicpulse.backend.user.dto.ChangePasswordRequest;
public interface UserService {

    String register(RegisterRequest request);

    LoginResponse login(LoginRequest request);

    ProfileResponseDto getProfile();

    ProfileResponseDto updateProfile(UpdateProfileRequest request);

    void changePassword(ChangePasswordRequest request);

    void deleteAccount();
}
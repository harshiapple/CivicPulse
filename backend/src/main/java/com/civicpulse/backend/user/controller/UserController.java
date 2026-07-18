package com.civicpulse.backend.user.controller;

import com.civicpulse.backend.user.dto.ChangePasswordRequest;
import com.civicpulse.backend.user.dto.ProfileResponseDto;
import com.civicpulse.backend.user.dto.UpdateProfileRequest;
import com.civicpulse.backend.service.UserService;   // ✅ Correct import
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(
            @RequestBody ChangePasswordRequest request) {

        userService.changePassword(request);

        return ResponseEntity.ok("Password changed successfully.");
    }

    @DeleteMapping("/delete-account")
    public ResponseEntity<String> deleteAccount() {

        userService.deleteAccount();

        return ResponseEntity.ok("Account deleted successfully.");
    }
}
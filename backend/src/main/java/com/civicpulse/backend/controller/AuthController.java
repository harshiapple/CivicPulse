package com.civicpulse.backend.controller;

import com.civicpulse.backend.dto.request.LoginRequest;
import com.civicpulse.backend.dto.response.LoginResponse;

import com.civicpulse.backend.dto.request.RegisterRequest;
import com.civicpulse.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return userService.register(request);
    }
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return userService.login(request);
    }

}
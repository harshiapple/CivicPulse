package com.civicpulse.backend.notification.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class NotificationResponseDto {

    private Long id;

    private String message;

    private boolean isRead;

    private LocalDateTime createdAt;
}
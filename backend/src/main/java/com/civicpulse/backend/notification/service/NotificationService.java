package com.civicpulse.backend.notification.service;

import com.civicpulse.backend.entity.User;
import com.civicpulse.backend.notification.dto.NotificationResponseDto;

import java.util.List;

public interface NotificationService {

    void createNotification(User user, String message);

    List<NotificationResponseDto> getMyNotifications();

    NotificationResponseDto markAsRead(Long notificationId);

    void markAllAsRead();

    long getUnreadCount();

}
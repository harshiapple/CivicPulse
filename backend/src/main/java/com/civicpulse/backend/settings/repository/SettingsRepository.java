package com.civicpulse.backend.settings.repository;

import com.civicpulse.backend.entity.User;
import com.civicpulse.backend.settings.entity.Settings;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SettingsRepository
        extends JpaRepository<Settings, Long> {

    Optional<Settings> findByUser(User user);

}
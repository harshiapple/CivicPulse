package com.civicpulse.backend.settings.entity;

import com.civicpulse.backend.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "settings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Settings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Boolean emailNotifications = true;

    private Boolean pushNotifications = true;

    private Boolean publicProfile = true;

    private Boolean locationSharing = true;

    private String theme = "Light";

    private String language = "English";

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;
}
package com.civicpulse.backend.repository;

import com.civicpulse.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
    List<User> findAllByOrderByPointsDesc();


//    List<User> findAllByOrderByPointsDesc();

}
package com.civicpulse.backend.complaint.repository;

import com.civicpulse.backend.complaint.entity.Complaint;
import com.civicpulse.backend.complaint.entity.ComplaintSupport;
import com.civicpulse.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

public interface ComplaintSupportRepository extends JpaRepository<ComplaintSupport, Long> {

    boolean existsByComplaintAndUser(Complaint complaint, User user);

    long countByComplaint(Complaint complaint);
    @Transactional
    @Modifying
    void deleteByComplaint(Complaint complaint);
    

}
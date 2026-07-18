package com.civicpulse.backend.complaint.repository;

import com.civicpulse.backend.complaint.entity.Complaint;
import com.civicpulse.backend.complaint.entity.ComplaintStatus;
import com.civicpulse.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDateTime;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    List<Complaint> findByUser(User user);

    List<Complaint> findByStatus(ComplaintStatus status);

    long countByStatus(ComplaintStatus status);

    long countByUser(User user);

    long countByUserAndStatus(User user, ComplaintStatus status);
    @Query("""
       SELECT c.category, COUNT(c)
       FROM Complaint c
       GROUP BY c.category
       """)
    List<Object[]> getCategoryStatistics();

    @Query("""
       SELECT MONTH(c.createdAt), COUNT(c)
       FROM Complaint c
       GROUP BY MONTH(c.createdAt)
       ORDER BY MONTH(c.createdAt)
       """)
    List<Object[]> getMonthlyComplaintStatistics();

    long countByCreatedAtAfter(LocalDateTime date);

    long countByCreatedAtAfterAndStatus(
            LocalDateTime date,
            ComplaintStatus status
    );
    List<Complaint> findTop5ByOrderByCreatedAtDesc();
    @Query("""
SELECT c.priority, COUNT(c)
FROM Complaint c
GROUP BY c.priority
""")
    List<Object[]> getPriorityStatistics();


    @Query("""
SELECT c.status, COUNT(c)
FROM Complaint c
GROUP BY c.status
""")
    List<Object[]> getStatusStatistics();


    @Query("""
SELECT c.location, COUNT(c)
FROM Complaint c
GROUP BY c.location
ORDER BY COUNT(c) DESC
""")
    List<Object[]> getTopLocations();


    @Query("""
SELECT c
FROM Complaint c
ORDER BY c.supportCount DESC,
         c.createdAt DESC
""")
    List<Complaint> findTopSupportedComplaints();

}
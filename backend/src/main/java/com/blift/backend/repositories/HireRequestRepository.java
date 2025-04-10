package com.blift.backend.repositories;

import com.blift.backend.entities.HireRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HireRequestRepository extends JpaRepository<HireRequest, Long> {

    // Find all hire requests for a specific RCIC
    List<HireRequest> findByRcicId(Long rcicId);

    // Find all hire requests sent by a specific user
    List<HireRequest> findByUserId(Long userId);
    List<HireRequest> findByUserIdAndStatus(Long userId, String status);

    boolean existsByUserIdAndRcicIdAndStatus(Long userId, Long rcicId, String status);

}

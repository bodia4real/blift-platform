package com.blift.backend.repositories;

import com.blift.backend.entities.Case;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CaseRepository extends JpaRepository<Case, Long> {
    List<Case> findByRcicId(Long rcicId);  // ✅ Get all cases assigned to a specific RCIC
    List<Case> findByUserId(Long rcicId);  // ✅ Get all cases assigned to a specific RCIC
}

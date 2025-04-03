package com.blift.backend.entities;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "case_types")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CaseType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String caseTypeName;

    @Column(columnDefinition = "TEXT")
    private String documentList;

    @Column(columnDefinition = "TEXT")
    private String documentFiles;
}

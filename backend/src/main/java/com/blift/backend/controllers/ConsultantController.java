//package com.blift.backend.controllers;
//
//import com.blift.backend.entities.Consultant;
//import com.blift.backend.services.ConsultantService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/consultants")
//public class ConsultantController {
//
//    @Autowired
//    private ConsultantService consultantService;
//
//    @GetMapping
//    public List<Consultant> getAllConsultants() {
//        return consultantService.getAllConsultants();
//    }
//
//    @PostMapping("/register")
//    public ResponseEntity<String> registerConsultant(@RequestBody Consultant consultant) {
//        consultantService.register(consultant);
//        return ResponseEntity.ok("Consultant registered successfully.");
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<String> loginConsultant(@RequestParam String email, @RequestParam String password) {
//        return ResponseEntity.ok(consultantService.login(email, password));
//    }
//}

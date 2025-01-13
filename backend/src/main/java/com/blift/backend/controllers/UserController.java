//package com.blift.backend.controllers;
//
//import com.blift.backend.entities.User;
//import com.blift.backend.services.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/users")
//public class UserController {
//
//    @Autowired
//    private UserService userService;
//
//    @GetMapping
//    public List<User> getAllUsers() {
//        return userService.getAllUsers();
//    }
//
//    @PostMapping("/register")
//    public ResponseEntity<String> registerUser(@RequestBody User user) {
//        userService.register(user);
//        return ResponseEntity.ok("User registered successfully.");
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<String> loginUser(@RequestParam String email, @RequestParam String password) {
//        return ResponseEntity.ok(userService.login(email, password));
//    }
//}

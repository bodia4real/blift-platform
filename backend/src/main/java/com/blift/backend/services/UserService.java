//package com.blift.backend.services;
//
//import com.blift.backend.entities.User;
//import com.blift.backend.repositories.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class UserService {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    public void register(User user) {
//        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
//            throw new IllegalArgumentException("User already exists.");
//        }
//        user.setPassword(passwordEncoder.encode(user.getPassword())); // Encode password
//        userRepository.save(user);
//    }
//
//    public String login(String email, String password) {
//        User user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new IllegalArgumentException("User not found."));
//        if (!passwordEncoder.matches(password, user.getPassword())) {
//            throw new IllegalArgumentException("Invalid credentials.");
//        }
//        return "User logged in successfully.";
//    }
//
//    public List<User> getAllUsers() {
//        return userRepository.findAll();
//    }
//}

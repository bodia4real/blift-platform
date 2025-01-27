package com.blift.backend.validations;

import java.security.SecureRandom;
import java.time.LocalDateTime;

public class TokenGenerator {
    private static final SecureRandom RANDOM = new SecureRandom();

    // Generate a 6-digit random code
    public static String generateVerificationCode() {
        return String.format("%06d", RANDOM.nextInt(999999));
    }

    // Calculate the expiry time for the code (e.g., 10 minutes from now)
    public static LocalDateTime generateExpiryTime() {
        return LocalDateTime.now().plusMinutes(10);
    }
}

package com.sleepingguard.service;

import com.sleepingguard.dto.AuthRequest;
import com.sleepingguard.dto.AuthResponse;
import com.sleepingguard.entity.User;
import com.sleepingguard.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;

    public AuthResponse register(AuthRequest request) {
        if (userRepository.findByLogin(request.getLogin()).isPresent()) {
            throw new RuntimeException("User with this login already exists");
        }

        User user = new User(null, request.getLogin(), request.getPassword(), 
            request.getName(), request.getCompanyName(), LocalDateTime.now(), null);
        User savedUser = userRepository.save(user);

        return new AuthResponse(savedUser.getId(), savedUser.getLogin(), 
            savedUser.getName(), savedUser.getCompanyName(), "Registration successful");
    }

    public AuthResponse login(AuthRequest request) {
        User user = userRepository.findByLogin(request.getLogin())
            .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return new AuthResponse(user.getId(), user.getLogin(), 
            user.getName(), user.getCompanyName(), "Login successful");
    }
}

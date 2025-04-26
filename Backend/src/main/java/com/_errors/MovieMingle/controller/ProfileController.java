package com._errors.MovieMingle.controller;

import com._errors.MovieMingle.dto.UserProfileDto;
import com._errors.MovieMingle.model.AppUser;
import com._errors.MovieMingle.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final AppUserRepository appUserRepository;

    @Autowired
    public ProfileController(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    @GetMapping
    public UserProfileDto getProfileData() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        AppUser currentUser = appUserRepository.findByEmail(userEmail);

        if (currentUser == null) {
            throw new RuntimeException("User not found");
        }

        return new UserProfileDto(
                currentUser.getFirstName(),
                currentUser.getLastName(),
                currentUser.getEmail(),
                currentUser.getAvatar()
        );
    }

    @PostMapping("/update-avatar")
    public String updateAvatar(@RequestBody Map<String, String> payload) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        AppUser currentUser = appUserRepository.findByEmail(userEmail);

        if (currentUser != null && payload.containsKey("avatar")) {
            String avatarPath = payload.get("avatar");
            String avatarFileName = avatarPath.substring(avatarPath.lastIndexOf('/') + 1);

            currentUser.setAvatar(avatarFileName);
            appUserRepository.save(currentUser);
            return "Avatar updated successfully!";
        }
        return "Error: User not found or invalid data.";
    }
}

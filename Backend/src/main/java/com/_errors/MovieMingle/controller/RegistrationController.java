package com._errors.MovieMingle.controller;

import com._errors.MovieMingle.dto.RegisterDto;
import com._errors.MovieMingle.exception.InvalidTokenException;
import com._errors.MovieMingle.exception.UserAlreadyExistsException;
import com._errors.MovieMingle.repository.AppUserRepository;
import com._errors.MovieMingle.service.user.DefaultAppUserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.util.StringUtils;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class RegistrationController {

    @Autowired
    private DefaultAppUserService userService;

    @Autowired
    private AppUserRepository userRepository;

    @Autowired
    private MessageSource messageSource;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDto registerDto,
                                      BindingResult result) {
        Locale locale = LocaleContextHolder.getLocale();

        Map<String, String> errors = new HashMap<>();

        if (result.hasErrors()) {
            result.getFieldErrors().forEach(fieldError -> {
                String field = fieldError.getField();
                // Remap `passwordConfirmed` to `confirmPassword`
                if ("passwordConfirmed".equals(field)) {
                    field = "confirmPassword";
                }
                errors.put(field, fieldError.getDefaultMessage());
            });

            return ResponseEntity.badRequest().body(errors);
        }

        if (userRepository.findByEmail(registerDto.getEmail()) != null) {
            errors.put("email", messageSource.getMessage("user.already.logged.in", null, locale));
            return ResponseEntity.badRequest().body(errors);
        }

        try {
            userService.register(registerDto);
            return ResponseEntity.ok(
                    messageSource.getMessage("user.registration.verification.email.msg", null, locale)
            );
        } catch (UserAlreadyExistsException e) {
            errors.put("email", messageSource.getMessage("user.already.logged.in", null, locale));
            return ResponseEntity.badRequest().body(errors);
        } catch (Exception e) {
            errors.put("general", "An unexpected error occurred.");
            return ResponseEntity.internalServerError().body(errors);
        }
    }


    @GetMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestParam(required = false) String token) {
        Locale locale = LocaleContextHolder.getLocale();
        Map<String, String> errors = new HashMap<>();

        if (StringUtils.isEmpty(token)) {
            errors.put("general", messageSource.getMessage("user.registration.verification.missing.token", null, locale));
            return ResponseEntity.badRequest().body(errors);
        }

        try {
            userService.verifyUser(token);
            return ResponseEntity.ok(
                    messageSource.getMessage("user.registration.verification.success", null, locale)
            );
        } catch (InvalidTokenException e) {
            errors.put("general", messageSource.getMessage("user.registration.verification.invalid.token", null, locale));
            return ResponseEntity.badRequest().body(errors);
        }
    }


}

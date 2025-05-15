package com._errors.MovieMingle.service.user;

import com._errors.MovieMingle.dto.RegisterDto;
import com._errors.MovieMingle.exception.UserAlreadyExistsException;
import com._errors.MovieMingle.model.AppUser;
import com._errors.MovieMingle.model.SecureToken;
import com._errors.MovieMingle.repository.AppUserRepository;
import com._errors.MovieMingle.repository.SecureTokenRepository;
import com._errors.MovieMingle.service.SecureTokenService;
import com._errors.MovieMingle.service.email.EmailService;
import jakarta.mail.MessagingException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class RegistrationServiceTestAI_Generated {

    @Mock
    private AppUserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private SecureTokenService secureTokenService;

    @Mock
    private EmailService emailService;

    @Mock
    private SecureTokenRepository secureTokenRepository;

    @InjectMocks
    private DefaultAppUserService registrationService;

    private RegisterDto input;

    @BeforeEach
    void setup() {
        input = new RegisterDto();
        input.setEmail("new@user.com");
        input.setPassword("1234");
        input.setFirstName("New");
        input.setLastName("User");

        ReflectionTestUtils.setField(registrationService, "baseURL", "http://localhost:8080");
    }

    @Test
    void shouldThrowExceptionIfUserExists() throws MessagingException {
        when(userRepository.findByEmail(input.getEmail())).thenReturn(new AppUser());

        assertThrows(UserAlreadyExistsException.class, () -> registrationService.register(input));
        verify(userRepository, never()).save(any());
        verify(emailService, never()).sendMail(any());
    }

    @Test
    void shouldRegisterNewUserCorrectly() throws Exception {
        when(userRepository.findByEmail(input.getEmail())).thenReturn(null);
        when(passwordEncoder.encode(input.getPassword())).thenReturn("hashed");
        when(userRepository.save(any())).thenAnswer(inv -> inv.getArguments()[0]);

        SecureToken token = new SecureToken();
        token.setToken("ai-generated-token");

        when(secureTokenService.createSecureToken()).thenReturn(token);
        when(secureTokenRepository.save(any())).thenReturn(token);

        registrationService.register(input);

        verify(passwordEncoder).encode("1234");
        verify(userRepository).save(any());
        verify(emailService).sendMail(any());
        verify(secureTokenService).createSecureToken();
    }
}

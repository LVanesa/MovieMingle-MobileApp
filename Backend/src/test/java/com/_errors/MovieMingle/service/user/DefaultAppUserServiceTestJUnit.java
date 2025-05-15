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

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class DefaultAppUserServiceTestJUnit {

    @Mock
    private AppUserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private EmailService emailService;

    @Mock
    private SecureTokenService secureTokenService;

    @Mock
    private SecureTokenRepository secureTokenRepository;


    @InjectMocks
    private DefaultAppUserService userService;


    private RegisterDto registerDto;
    private AppUser appUser;

    @BeforeEach
    public void setUp() {
        registerDto = new RegisterDto();
        registerDto.setEmail("test@example.com");
        registerDto.setPassword("password");
        registerDto.setFirstName("User");
        registerDto.setLastName("Test");

        appUser = new AppUser();
        appUser.setEmail("test@example.com");
        appUser.setPassword("encodedPassword");
        appUser.setFirstName("User");
        appUser.setLastName("Test");
        appUser.setRole("user");
        appUser.setCreatedAt(new Date());
        appUser.setAvatar("avatar1.jpg");
    }

    @Test
    public void testRegister_UserAlreadyExists() {
        // simulam gasirea unui user existent
        when(userRepository.findByEmail(registerDto.getEmail())).thenReturn(appUser);

        // verificam ca nu se salveaza ptc se arunca exceptia UserAlreadyExistsException
        assertThrows(UserAlreadyExistsException.class, () -> {
            userService.register(registerDto);
        });

        verify(userRepository, never()).save(any(AppUser.class));
    }


    @Test
    public void testRegister_Success() throws UserAlreadyExistsException, MessagingException {
        // simulam salvarea user-ului nou
        when(userRepository.findByEmail(registerDto.getEmail())).thenReturn(null);
        when(passwordEncoder.encode(registerDto.getPassword())).thenReturn("encodedPassword");
        when(userRepository.save(any(AppUser.class))).thenReturn(appUser);

        // configuram SecureTokenService sa returneze un SecureToken valid
        SecureToken secureToken = new SecureToken();
        secureToken.setToken("valid-token");
        when(secureTokenService.createSecureToken()).thenReturn(secureToken);
        when(secureTokenRepository.save(any(SecureToken.class))).thenReturn(secureToken);

        // setam valoarea pentru baseURL folosind ReflectionTestUtils
        ReflectionTestUtils.setField(userService, "baseURL", "http://localhost:8080");

        userService.register(registerDto);

        // verificam
        assertEquals("test@example.com", appUser.getEmail());
        assertEquals("encodedPassword", appUser.getPassword());
        assertEquals("User", appUser.getFirstName());
        assertEquals("valid-token", secureToken.getToken());

        verify(userRepository, times(1)).findByEmail(registerDto.getEmail());
        verify(passwordEncoder, times(1)).encode(registerDto.getPassword());
        verify(userRepository, times(1)).save(any(AppUser.class));
        verify(emailService, times(1)).sendMail(any());
        verify(secureTokenRepository, times(1)).save(any(SecureToken.class));
    }

    @Test
    public void testEncodePassword() {
        RegisterDto registerDto = new RegisterDto();
        registerDto.setPassword("plainPassword");
        AppUser appUser = new AppUser();

        // setam comportamentul mock-ului pentru passwordEncoder
        when(passwordEncoder.encode("plainPassword")).thenReturn("encodedPassword");

        // apelam metoda privata encodePassword tot prin reflectie
        ReflectionTestUtils.invokeMethod(userService, "encodePassword", registerDto, appUser);

        // verificam ca parola a fost codificata corect
        assertEquals("encodedPassword", appUser.getPassword());
        verify(passwordEncoder, times(1)).encode("plainPassword");
    }


    @Test
    public void testCheckIfUserExist_UserExists() {
        String email = "test@example.com";
        when(userRepository.findByEmail(email)).thenReturn(appUser);

        boolean userExists = userService.checkIfUserExist(email);

        assertTrue(userExists);
        verify(userRepository, times(1)).findByEmail(email);
    }

    @Test
    public void testCheckIfUserExist_UserDoesNotExist() {
        String email = "nonexistent@example.com";
        when(userRepository.findByEmail(email)).thenReturn(null);

        boolean userExists = userService.checkIfUserExist(email);

        assertFalse(userExists);
        verify(userRepository, times(1)).findByEmail(email);
    }



}
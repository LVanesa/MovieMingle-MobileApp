package com._errors.MovieMingle.service.user;
import com._errors.MovieMingle.dto.RegisterDto;
import com._errors.MovieMingle.exception.UserAlreadyExistsException;
import com._errors.MovieMingle.model.AppUser;
import com._errors.MovieMingle.model.SecureToken;
import com._errors.MovieMingle.repository.AppUserRepository;
import com._errors.MovieMingle.repository.SecureTokenRepository;
import com._errors.MovieMingle.service.SecureTokenService;
import com._errors.MovieMingle.service.email.EmailService;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.testng.annotations.*;
import static org.mockito.Mockito.*;
import static org.testng.Assert.*;
import org.testng.annotations.Test;


public class DefaultAppUserServiceTestNG {

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

    @BeforeMethod
    public void setUp() {
        MockitoAnnotations.openMocks(this);

        registerDto = new RegisterDto();
        registerDto.setEmail("test@example.com");
        registerDto.setPassword("password");
        registerDto.setFirstName("User");
        registerDto.setLastName("Test");

        appUser = new AppUser();
        appUser.setEmail("test@example.com");
    }

    @Test(expectedExceptions = UserAlreadyExistsException.class)
    public void testRegister_UserAlreadyExists() throws UserAlreadyExistsException {
        // Simulam existenta utilizatorului în DB
        when(userRepository.findByEmail(registerDto.getEmail())).thenReturn(appUser);
        // Apelul ar trebui să arunce excepția
        userService.register(registerDto);
        // Verificam că nu s-a incercat salvarea in DB
        verify(userRepository, never()).save(any(AppUser.class));
    }

    @Test
    public void testRegister_Success() throws Exception {
        when(userRepository.findByEmail(registerDto.getEmail())).thenReturn(null);
        when(passwordEncoder.encode(registerDto.getPassword())).thenReturn("encodedPassword");
        when(userRepository.save(any(AppUser.class))).thenReturn(appUser);

        SecureToken token = new SecureToken();
        token.setToken("secure-token");
        when(secureTokenService.createSecureToken()).thenReturn(token);
        when(secureTokenRepository.save(any(SecureToken.class))).thenReturn(token);

        // Setam field-ul baseURL pentru test
        org.springframework.test.util.ReflectionTestUtils.setField(userService, "baseURL", "http://localhost:8080");

        userService.register(registerDto);

        verify(userRepository).save(any(AppUser.class));
        verify(emailService).sendMail(any());
    }

}

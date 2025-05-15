
package com._errors.MovieMingle.integration;

import com._errors.MovieMingle.model.AppUser;
import com._errors.MovieMingle.model.Movie;
import com._errors.MovieMingle.repository.AppUserRepository;
import com._errors.MovieMingle.repository.MovieRepository;
import com._errors.MovieMingle.service.user.CustomUserDetailsService;
import com._errors.MovieMingle.service.user.UserWatchedMovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.transaction.annotation.Transactional;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;

import static org.testng.Assert.*;

@SpringBootTest
@Transactional
@DirtiesContext
public class IntegrationTestsTestNG  extends AbstractTestNGSpringContextTests {

    @Autowired
    private AppUserRepository userRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private UserWatchedMovieService userWatchedMovieService;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    private AppUser user;
    private Movie movie;

    @BeforeMethod
    public void setUp() {
        // Create and save a test user
        user = new AppUser();
        user.setEmail("testng@example.com");
        user.setPassword("secure");
        user.setRole("user");
        user.setAccountVerified(true);
        userRepository.save(user);

        // Create and save a test movie
        movie = new Movie();
        movie.setTMDBId(12345L);
        movie.setSeriesTitle("TestNG Movie");
        movie.setPosterLink("poster.jpg");
        movie.setRuntime("100");
        movie.setDirector("Test Director");
        movie.setOverview("Test Overview");

        movieRepository.save(movie);
    }

    @Test
    public void testAddMovieToWatched_Success() {
        String result = userWatchedMovieService.addMovieToWatched((long) user.getId(), movie.getTmdbId(), movie.getSeriesTitle());
        assertEquals(result, "Movie added to watched list.");

        boolean isWatched = userWatchedMovieService.isMovieWatched((long) user.getId(), movie.getTmdbId());
        assertTrue(isWatched);
    }

    @Test
    public void testLoadUserByUsername_UserExists() {
        UserDetails userDetails = customUserDetailsService.loadUserByUsername("testng@example.com");

        assertNotNull(userDetails);
        assertEquals(userDetails.getUsername(), "testng@example.com");
        assertEquals(userDetails.getPassword(), "secure");
        assertTrue(userDetails.isEnabled());
    }
}

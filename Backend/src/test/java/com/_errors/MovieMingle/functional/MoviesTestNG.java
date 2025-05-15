package com._errors.MovieMingle.functional;

import com._errors.MovieMingle.dto.MovieDto;
import com._errors.MovieMingle.service.MovieApiClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import org.testng.annotations.Test;

import java.util.List;

import static org.testng.Assert.*;

@SpringBootTest
public class MoviesTestNG extends AbstractTestNGSpringContextTests {

    @Autowired
    private MovieApiClient movieApiClient;

    @Test
    public void testSearchMoviesReturnsResults() {
        List<MovieDto> movies = movieApiClient.getMoviesBySearch("Inception", 1);
        assertNotNull(movies, "Movie list should not be null");
        assertFalse(movies.isEmpty(), "Movie list should not be empty");

        boolean titleMatches = movies.stream()
                .anyMatch(movie -> movie.getTitle() != null && movie.getTitle().toLowerCase().contains("inception"));

        assertTrue(titleMatches, "At least one movie should contain 'Inception' in the title");
    }

    @Test
    public void testGetMoviesByGenre() {
        List<MovieDto> comedyMovies = movieApiClient.getMoviesByGenre("35", 1);
        assertNotNull(comedyMovies, "Comedy movie list should not be null");
        assertFalse(comedyMovies.isEmpty(), "Comedy movie list should not be empty");
    }
}

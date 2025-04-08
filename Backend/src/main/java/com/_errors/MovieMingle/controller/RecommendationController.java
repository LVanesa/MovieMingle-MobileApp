package com._errors.MovieMingle.controller;

import com._errors.MovieMingle.dto.MovieDto;
import com._errors.MovieMingle.model.AppUser;
import com._errors.MovieMingle.model.Movie;
import com._errors.MovieMingle.recommendation.SVDRecommendationService;
import com._errors.MovieMingle.repository.AppUserRepository;
import com._errors.MovieMingle.service.MovieApiClient;
import com._errors.MovieMingle.service.user.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api")
public class RecommendationController {

    @Autowired
    private AppUserRepository userRepository;
    @Autowired
    private AppUserService userService;
    @Autowired
    private SVDRecommendationService svdRecommendationService;
    @Autowired
    private MovieApiClient movieApiClient;

    @GetMapping("/recommendations")
    public ResponseEntity<List<Movie>> getUserRecommendations(@RequestParam int userId) {
        AppUser user = userRepository.findById(userId).orElse(null);
        List<Movie> recommendations = new ArrayList<>();

        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        try {
            recommendations = svdRecommendationService.recommendMovies((long) user.getId(), 10);
        } catch (Exception e) {
            System.err.println("Error getting recommendations for user ID: " + userId);
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }

        return ResponseEntity.ok(recommendations);
    }


    @GetMapping("/surprise")
    @ResponseBody
    public Map<String, String> getSurpriseMovie() {
        List<MovieDto> popularMovies = movieApiClient.getPopularMovies();
        List<MovieDto> topRatedMovies = movieApiClient.getTopRatedMovies();

        List<MovieDto> combinedMovies = Stream.concat(popularMovies.stream(), topRatedMovies.stream())
                .toList();

        Map<String, String> response = new HashMap<>();

        if (!popularMovies.isEmpty()) {
            int randomIndex = new Random().nextInt(combinedMovies.size());
            MovieDto randomMovie = combinedMovies.get(randomIndex);

            System.out.println("Selected surprise movie ID: " + randomMovie.getId());

            try {
                MovieDto validatedMovie = movieApiClient.getMovie(randomMovie.getId());
                if (validatedMovie != null && validatedMovie.getId() != null) {
                    String movieUrl = "/movie-details/" + validatedMovie.getId();
                    System.out.println("Sending URL to the client: " + movieUrl);
                    response.put("url", movieUrl);
                } else {
                    System.err.println("The validated movie is NULL!");
                    response.put("url", "/homepage");
                }
            } catch (Exception e) {
                System.err.println("Error validating the surprise movie: " + e.getMessage());
                e.printStackTrace();
                response.put("url", "/homepage");
            }
        } else {
            System.err.println("There are no popular or top-rated movies in the database.");
            response.put("url", "/homepage");
        }

        return response;
    }

}
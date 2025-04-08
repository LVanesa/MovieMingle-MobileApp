package com._errors.MovieMingle.controller;

import com._errors.MovieMingle.model.AppUser;
import com._errors.MovieMingle.model.Movie;
import com._errors.MovieMingle.service.user.UserFavouritesService;
import com._errors.MovieMingle.service.user.UserToWatchService;
import com._errors.MovieMingle.service.user.UserWatchedMovieService;
import com._errors.MovieMingle.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mylists")
public class UserAllMoviesController {

    @Autowired
    private UserWatchedMovieService watchedService;
    @Autowired
    private UserFavouritesService favouritesService;
    @Autowired
    private UserToWatchService toWatchService;
    @Autowired
    private RatingService ratingService;

    @GetMapping("/watched")
    public List<Movie> getWatchedMovies(@RequestParam int userId) {
        return watchedService.getUserWatchedMovies(userId);
    }

    @GetMapping("/watchlist")
    public List<Movie> getWatchlistMovies(@RequestParam int userId) {
        return toWatchService.getUserToWatchMovies(userId);
    }

    @GetMapping("/favourites")
    public List<Movie> getFavouritesMovies(@RequestParam int userId) {
        return favouritesService.getUserFavouriteMovies(userId);
    }

    @GetMapping("/rated")
    public List<Movie> getRatedMovies(@RequestParam int userId) {
        return ratingService.getUserRatedMovies(userId);
    }
}

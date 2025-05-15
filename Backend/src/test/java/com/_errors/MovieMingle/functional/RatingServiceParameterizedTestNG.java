package com._errors.MovieMingle.functional;

import com._errors.MovieMingle.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import static org.testng.Assert.assertEquals;

@SpringBootTest
public class RatingServiceParameterizedTestNG extends AbstractTestNGSpringContextTests {

    @Autowired
    private RatingService ratingService;

    @DataProvider(name = "ratingData")
    public Object[][] ratingData() {
        return new Object[][] {
                { 1L, 100L, 5, "Rating added successfully" },
                { 999L, 100L, 4, "User not found" },           // user doesn't exist
                { 1L, 807L, 3, "Rating added successfully" } // new movie
        };
    }

    @Test(dataProvider = "ratingData")
    public void testAddRating(Long userId, Long tmdbId, int ratingValue, String expectedMessage) {
        String result = ratingService.addRating(userId, tmdbId, ratingValue);
        assertEquals(result, expectedMessage);
    }
}

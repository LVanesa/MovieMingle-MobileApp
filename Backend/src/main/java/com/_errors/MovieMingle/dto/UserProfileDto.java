package com._errors.MovieMingle.dto;

public class UserProfileDto {
    private String firstName;
    private String lastName;
    private String email;
    private String avatar;

    public UserProfileDto(String firstName, String lastName, String email, String avatar) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.avatar = avatar;
    }

    // Getters
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getEmail() { return email; }
    public String getAvatar() { return avatar; }
}

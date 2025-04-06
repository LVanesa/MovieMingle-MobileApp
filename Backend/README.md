# 🎬 MovieMingle

## 📖 Description
MovieMingle is a web application that recommends movies to users based on their preferences. The app enhances the viewing experience through predictions using machine learning techniques. With an easy-to-use interface and a modern, attractive design, MovieMingle becomes the ideal partner for film enthusiasts looking for new movies that suit their tastes. Whether you prefer dramas, comedies, or thrillers, the app will provide recommendations that meet your expectations.


## 🌟 Product Vision
▎**FOR** - For people passionate about the world of cinematography.

▎**WHO** - The users who are looking for new movies tailored to their unique preferences.

▎**PRODUCT NAME** - MovieMingle is a web app designed to provide movie recommendations. 

▎**THAT** - Our app is a user-friendly tool for those times when you feel like you've run out of movies to watch.

▎**UNLIKE** - Unlike other platforms that do not provide personalized movie recommendations.

▎**OUR PRODUCT** - Our app provides customized movie suggestions based on your individual preferences, making it easy to find what to watch next.


## 📖 User Stories

- [ ] **As a** potential user, **I want** to create a personal account on the platform, **so that** I can use this application.

- [ ] **As a** user, **I want** to login to my MovieMingle account, **so that** I can access my profile. 

- [ ] **As a** new user, **I want** an intuitive interface, **so that** I can navigate quickly through the app.

- [ ] **As a** user, **I want** to browse through the movie collection, **so that** I can explore them. 

- [ ] **As a** casual movie watcher, **I want** to check the movies I have already watched, **so that** I could further review them.

- [ ] **As a** registered user, **I want** to rate movies after watching them, **so that** the app can provide recommendations in the future.

- [ ] **As a** user, **I want** to be able to edit my watched list, **so that** I can prevent possible mistakes.

- [ ] **As a** user, **I want** to be able to edit my reviews, **so that** I can update them if I change my mind. 

- [ ] **As a** cinephile, **I want** to ask for personalized movie recommendations, **so that** I can easily find films that match my unique taste.
     
- [ ] **As a** user, **I want** a comprehensive analytics dashboard, **so that** I can have an insight into my movie watching habits . 


## 📋 Requirements

### User Story: As a potential user, I want to create a personal account on the platform, so that I can use this application.
**Requirements:**
* Implement a "Sign Up" button on the landing page.
* Create a registration form with fields for username, email, password, and any other necessary information.
* Validate user input and provide feedback for errors.

### User Story: As a user, I want to login to my MovieMingle account, so that I can access my profile.
**Requirements:**
* Implement a "Login" button on the landing page.
* Create a login form with fields for email and password.
* Validate user credentials and provide feedback for incorrect logins.

### User Story: As a new user, I want an intuitive interface, so that I can navigate quickly through the app.
**Requirements:**
* Design a user-friendly interface with clear navigation menus and icons.
* Conduct usability testing to ensure intuitive navigation.

### User Story: As a user, I want to browse through the movie collection, so that I can explore them.
**Requirements:**
* Display a searchable and filterable movie collection on the movie page.
* Implement filters for genres and other attributes.
* Allow users to view movie details upon selection.

### User Story: As a casual movie watcher, I want to check the movies I have already watched, so that I could further review them.
**Requirements:**
* Create a "Watched Movies" page in the user menu.
* Display a list of movies with titles, ratings, etc.
* Provide options to view details or edit the watched list.

### User Story: As a registered user, I want to rate movies after watching them, so that the app can provide recommendations in the future.
**Requirements:**
* Allow users to rate movies on a scale (e.g., 1 to 5 stars).
* Implement a system to record and save ratings associated with user profiles.
* Use ratings to influence future movie recommendations.

### User Story: As a user, I want to be able to edit my watched list, so that I can prevent possible mistakes.
**Requirements:**
* Implement an "Edit" option for each movie in the "Watched Movies" section.
* Allow users to add or remove movies from the watched list.

### User Story: As a user, I want to be able to edit my reviews, so that I can update them if I change my mind.
**Requirements:**
* Allow users to access their reviews from the movie profile.
* Implement an "Edit Review" option to modify existing reviews.
* Save updated reviews and display them correctly.

### User Story: As a cinephile, I want to ask for personalized movie recommendations, so that I can easily find films that match my unique taste.
**Requirements:**
* Implement a recommendation algorithm based on user preferences and ratings.
* Provide a page for recommended movies.

### User Story: As a user, I want a comprehensive analytics dashboard, so that I can have an insight into my movie watching habits.
**Requirements:**
* Design an analytics dashboard that summarizes viewing statistics (e.g., genres watched, time spent).
* Implement an "Update" button that allows users to refresh the analytics data on demand.


## 🧩 Product Features

<div align="center">

| Feature              | Functionalities                                                                 |
|----------------------|----------------------------------------------------------------------------------|
| **Account**          | - Create<br>- Login/Logout<br>- Delete                                          |
| **Landing Page**     | - Look up movie content<br>- Navigate through menu<br>- Explore recommended/randomized movie list |
| **Movie Profile**    | - Create a movie profile<br>- Add/Edit rating of the movie                      |
| **Watched Movie List** | - Add new watched movies<br>- Open a movie profile<br>- Browse through movie list<br>- Filter based on movie genres |
| **To-Watch Movie List** | - Add any movie from the database<br>- Delete movie from the list<br>- Browse through movie list<br>- Transfer movie from to-watch to watched list<br>- Filter based on movie genres |
| **Recommended Movie List** | - Filter based on movie genres<br>- Add a movie to the to-watch list<br>- Browse through movie list<br>- Press "Surprise Me" button<br>- Filter based on other users' ratings |
| **Surprise Me Page** | - Discover new movie<br>- Add the movie to the to-watch list                    |
| **Movie Preferences Dashboard Page** | - View analyzed ranked movie preferences by genre <br> - Track viewing time <br> - Explore personalized insights |

</div>


## 📊 UML Diagrams
### Use Case Diagram
![Use Case Diagram](/Backend/Diagrams/moviemingle_use_case_diagram.png)
<br>
### Class Diagram
![Class Diagram](/Backend/Diagrams/moviemingle_class_diagram.png)

## 📈 C4 Diagrams

### System Context Diagram
<img src="/Backend/Diagrams/C4%20Diagram%20MovieMingle%20SystemContext.png" width="400" alt="System Context Diagram">

### Containers Diagram
<img src="/Backend/Diagrams/C4%20Diagram%20MovieMingle%20Containers.png" width="600" alt="Containers Diagram">

### Components Diagram
<img src="/Backend/Diagrams/C4%20Diagram%20MovieMingle%20Components.png" width="1000" alt="Components Diagram">


## 🏛️ Architectural Description  
### 🔧 Technologies used

###  Backend 
- **Spring Boot Framework**: Core Java framework powering the application architecture through controllers (HTTP request handling), services (business logic), and models (data structure)

- **MySQL**: Local database system storing application data, working with JPA Repository for streamlined database operations without complex SQL queries

- **Security Implementation**: 
 - JWT (JSON Web Tokens) for secure authentication and session management
 - CSRF protection against malicious attacks 
 - Google OAuth2 integration for Google account sign-in functionality

### Data Management 
- **Data Transfer Objects (DTOs)**: Manages efficient data transfer between frontend and backend layers

- **Java Database Seeder**: Handles database initialization with starter data for development and testing

### Frontend 
- **React Native**
  
### External Integration 
- **TMDB API**: Provides real-time movie data, ratings, and cinema information

### ✨ Final Product
Movie Mingle is a web application designed for movie enthusiasts of all tastes. It provides personalized movie recommendations based on user ratings and offers endless opportunities to explore the vast world of cinema using TMDB’s extensive movie database. Users can effortlessly organize their movie lists into categories such as Watched, To Watch, Favorites, and Rated, making it easier to plan their next movie night. Additionally, the dashboard analytics section allows them to track their viewing activity.

Our final product aligns closely with our initial vision while incorporating enhancements such as API integration for fetching detailed movie information and seeders to populate our database. We also introduced new features, including a Favorites and Rated movies list and Google OAuth integration, elevating the user experience.
  
### 🚀 Functional Requirements  

#### 👤 User Management  
- Users must be able to **create an account** using email and password and log in securely.  
- Users must be able to **view their profile**, including their movie lists:  
  - 🎞️ *Watched*  
  - 📌 *To Watch*  
  - ❤️ *Favourite*  
  - ⭐ *Rated*  
- Users must be able to **edit their profile** and update their movie ratings.  
- Users must be able to **view a personalized dashboard** based on their watched movies.  

---

#### 🎥 Movie Management  
- Users must be able to view a **list of top-watched and top-rated movies**.  
- Users must be able to access **detailed information about a movie**, including:  
  - 🎭 Title  
  - 🎬 Genre  
  - 📝 Description  
  - ⭐ Ratings  
  - 🎭 Cast  

---

#### 🔄 User Interactions  
- Users must be able to **add movies** to their personal lists:  
  - 📌 *Watch*  
  - ❤️ *Favourite*  
  - ⭐ *Rated*  
  - ⏳ *To Watch*  
- Users must be able to **rate a movie** on a scale of **1-10 stars**.  

---

#### 🔍 Search & Navigation  
- Users must be able to **search for a movie by title**.  
- Users must be able to **filter movies by genres** (e.g., Fiction, Comedy).  

### 🔒 Non-Functional Requirements  

#### 🔐 Security  
- The system must support **user authentication** and guarantee that passwords are **securely managed**, utilizing at least basic encryption or hashing techniques.  

---

#### ⚡ Performance  
- The application should deliver a **responsive experience**, ensuring that **movie searches** and **list loading** happen with minimal delay.  

---

#### 🌍 Compatibility  
- The system should be **optimized for Google Chrome and Microsoft Edge**, with no requirement for adaptation to other browsers.  



## 🛠️ QA  

Our **MovieMingle** application has been thoroughly tested using four types of testing strategies. These tests ensure that every component works as expected and that the overall user experience is smooth and reliable.

---

## 1. Unit Tests 🧪

Unit tests are designed to verify the correctness of individual methods and functions. For MovieMingle, we have implemented **50 unit tests** covering key functionalities such as matrix building, user registration, password handling, movie favourites, rating management, and secure token management. Every test case checks for expected results, and **all tests have passed**. Below is a summary table of our main unit test cases:

| **Test Case**                                      | **Expected Result**                              | **Status** |
|----------------------------------------------------|--------------------------------------------------|------------|
| `testBuildMatrix`                                  | Matrix built successfully                        | Passed     |
| `testRatingMatrix`                                 | Rating matrix correctly computed                 | Passed     |
| `testTrainModel`                                   | Model trained successfully                       | Passed     |
| `testRecommendMovies`                              | Movies recommended accurately                    | Passed     |
| `testUpdateRating`                                 | Rating updated correctly                         | Passed     |
| `testForgottenPassword_Success`                    | Reset password email sent                        | Passed     |
| `testForgottenPassword_UserNotFound`               | User not found error handled                     | Passed     |
| `testUpdatePassword_Success`                       | Password updated successfully                    | Passed     |
| `testUpdatePassword_InvalidToken`                  | Invalid token error handled                      | Passed     |
| `testUpdatePassword_ExpiredToken`                  | Expired token error handled                      | Passed     |
| `testUpdatePassword_UserNotFound`                  | User not found error handled                     | Passed     |
| `testSendResetPasswordEmail_Success`               | Reset password email sent                        | Passed     |
| `testRegister_UserAlreadyExists`                   | Duplicate user error handled                     | Passed     |
| `testRegister_Success`                             | User registered successfully                     | Passed     |
| `testEncodePassword`                               | Password encoded correctly                       | Passed     |
| `testSendRegistrationConfirmationEmail_Success`    | Confirmation email sent                          | Passed     |
| `testCheckIfUserExist_UserExists`                  | User exists validation passed                    | Passed     |
| `testCheckIfUserExist_UserDoesNotExist`            | No user found as expected                        | Passed     |
| `testAddMovieToFavourites_UserNotFound`            | User not found error handled                     | Passed     |
| `testAddMovieToFavourites_MovieAlreadyInFavourites`  | Duplicate movie error handled                    | Passed     |
| `testAddMovieToFavourites_NewMovie`                | New movie added to favourites                    | Passed     |
| `testIsMovieFavourite_MovieNotInFavourites`        | Movie not in favourites verified                 | Passed     |
| `testIsMovieFavourite_MovieInFavourites`           | Movie in favourites confirmed                    | Passed     |
| `testRemoveFromFavourites_UserNotFound`            | User not found error handled                     | Passed     |
| `testRemoveFromFavourites_MovieNotFound`           | Movie not found error handled                    | Passed     |
| `testRemoveFromFavourites_MovieNotInFavourites`    | Movie not in favourites handled                  | Passed     |
| `testRemoveFromFavourites_Success`                 | Movie removed successfully                       | Passed     |
| `testGetUserFavouriteMovies`                       | Favourite movies retrieved                       | Passed     |
| `testGetUserDashboardStats`                        | Dashboard stats computed correctly               | Passed     |
| `testGetUserDashboardStats_NoData`                 | No data scenario handled correctly               | Passed     |
| `testCreateSecureToken`                            | Secure token created                             | Passed     |
| `testSaveSecureToken`                              | Secure token saved                               | Passed     |
| `testFindByToken`                                  | Token found successfully                         | Passed     |
| `testFindByToken_NotFound`                         | Token not found handled                          | Passed     |
| `testRemoveToken`                                  | Token removed successfully                       | Passed     |
| `testRemoveTokenByToken`                           | Token removed by identifier                      | Passed     |
| `testGetTokenValidityInSeconds`                    | Token validity computed correctly                | Passed     |
| `testAddRating_UserNotFound`                       | User not found error handled                     | Passed     |
| `testAddRating_NewMovie`                           | Rating added for a new movie                     | Passed     |
| `testAddRating_ExistingMovie`                      | Existing movie rating updated                    | Passed     |
| `testRemoveRating_UserNotFound`                    | User not found error handled                     | Passed     |
| `testRemoveRating_MovieNotFound`                   | Movie not found error handled                    | Passed     |
| `testRemoveRating_RatingNotFound`                  | Rating not found error handled                   | Passed     |
| `testRemoveRating_Success`                         | Rating removed successfully                      | Passed     |
| `testGetAverageRating_NoRatings`                   | No ratings scenario handled                      | Passed     |
| `testGetAverageRating_WithRatings`                 | Average rating computed accurately               | Passed     |
| `testGetUserRating_RatingNotFound`                 | Rating not found error handled                   | Passed     |
| `testGetUserRating_Success`                        | User rating retrieved successfully               | Passed     |
| `testGetUserRatedMovies_NoRatings`                 | No rated movies scenario handled                 | Passed     |
| `testGetUserRatedMovies_WithRatings`               | Rated movies retrieved correctly                 | Passed     |

---

## 2. Integration Tests 🔗

Integration tests validate the interactions between different modules, ensuring that controllers, HTTP request URIs, and other components work seamlessly together. For MovieMingle, we have implemented **17 integration tests** that simulate real-world user interactions (including authentication and secured endpoints) and validate overall system performance. In these tests, we used an **in-memory H2 database** to simulate the database environment, ensuring fast and isolated testing. All integration tests have passed. Here is an overview of the main integration test cases:


| **Test Case**                                          | **Expected Result**                                     | **Status** |
|--------------------------------------------------------|---------------------------------------------------------|------------|
| `testUserLogin`                                        | User is able to log in successfully                     | Passed     |
| `testGetUserByEmail`                                   | User retrieved correctly by email                       | Passed     |
| `testIsMovieWatched`                                   | Movie watched status verified                           | Passed     |
| `testAddMovieToWatched`                                | Movie added to the watched list successfully            | Passed     |
| `testAddMovieToWatched_AlreadyWatched`                 | Already watched movie is handled appropriately          | Passed     |
| `testLoadUserByUsername_UserExists`                    | User details loaded successfully                        | Passed     |
| `testLoadUserByUsername_UserDoesNotExist`              | Non-existent user error handled                         | Passed     |
| `testGetUserDashboardStats`                            | Dashboard stats returned accurately                     | Passed     |
| `testForgottenPassword_UserDoesNotExist`               | Forgotten password for non-existent user handled        | Passed     |
| `testUpdatePassword_ValidToken`                        | Password updated with a valid token                     | Passed     |
| `testUpdatePassword_InvalidToken`                      | Invalid token error handled during password update      | Passed     |
| `testGetProfilePage_UserAuthenticated`                 | Authenticated user can access profile page              | Passed     |
| `testUpdateAvatar_ValidRequest`                        | Avatar updated successfully after a valid request       | Passed     |
| `testUpdateAvatar_InvalidRequest`                      | Invalid avatar update request handled correctly         | Passed     |
| `testGetProfilePage_UserNotAuthenticated`              | Non-authenticated user is denied access                 | Passed     |
| `testIsMovieToWatch_True`                              | Movie marked to watch is confirmed                      | Passed     |
| `testAddMovieTotoWatch_Success`                        | Movie added to the watch list successfully              | Passed     |

---

## 3. Manual Testing 🖥️

In addition to automated tests, comprehensive manual testing was conducted to simulate real user interactions. Manual testing allowed us to validate:
- **Edge cases** that automated tests might not fully capture.
- **User interface flows** and overall usability.
- **Error scenarios** to ensure proper error handling and messaging.

This approach ensured that the application behaves as expected in real-world scenarios and provides a seamless user experience.

---

## 4. Performance Testing ⚡

Performance testing was executed using Lighthouse via the browser's Inspect tool. This allowed us to assess:
- **Page load times**
- **Responsiveness**
- **Accessibility**
- **Adherence to best practices**

The insights gathered from Lighthouse helped us optimize the MovieMingle application for better performance and a superior user experience. The performance tests confirmed that the application remains efficient even under high load.

---

Overall, our comprehensive testing strategy—including **unit tests**, **integration tests**, **manual tests**, and **performance tests**—ensures that MovieMingle is robust, efficient, and reliable. All test cases have passed, guaranteeing that the application meets high standards of quality and performance. 😀


## 🛡️ Security Analysis 
MovieMingle implements **Spring Security** for authentication, supporting both **email/password login** and **OAuth2 (Google)**. Password reset is secured via **token-based validation**. This analysis aligns with **OWASP Top 10** security risks, identifying key risks and recommending improvements to enhance overall system security.

---

### 🔑 Password Security  
✔ **Strengths:**  
- Uses **BCrypt hashing** for strong password protection.  
- Password validation enforces **regular expressions** to prevent weak passwords.  

⚡ **Improvements:**  
- Set **BCrypt cost factor to 12+** to enhance brute-force resistance.  
- Implement a **password policy validator** enforcing stricter password complexity.  

---

### 📧 Email Verification Tokens  
✔ **Strengths:**  
- Email verification is required before account activation.  
- Tokens are **single-use** and **auto-deleted upon verification**.  

⚡ **Improvements:**  
- **Schedule clean-up of expired tokens** to optimize database performance.  
- **Enforce token expiration** (e.g., **24 hours**) to limit prolonged access.  

---

### 🔄 Password Reset Mechanism Security  
✔ **Strengths:**  
- Password reset is **token-based** and secured via email verification.  
- Reset tokens are **deleted immediately after use**, preventing reuse.  

⚡ **Improvements:**  
- **Set token expiration** (e.g., **30 min**) to mitigate unauthorized use.  
- **Ensure only one active reset token per user** at any time.  

---

### 🌐 OAuth2 Authentication (Google)  
✔ **Strengths:**  
- OAuth2 login is integrated, ensuring a seamless authentication process.  
- The application **extracts and verifies the user's email** as a unique identifier.  

⚠ **Observations:**  
- Authentication **fails** if the OAuth2 provider **does not return an email**.  

⚡ **Improvements:**  
- Add **fallback handling** for cases where an email attribute is missing.  

---

### 🛑 CSRF Protection  
✔ **Strength:** **CSRF is enabled** for user authentication and account-related actions. 

---


### 🚧 Brute Force Protection  
⚠ **Observations:**  
- No **rate limiting** for login attempts, making the system vulnerable to brute force attacks.  
- No **temporary account lockout mechanism** for repeated authentication failures.  

🔒 **Recommendations:**  
- Implement **rate limiting** (e.g., **5 attempts per 10 sec**) and **temporary account lockout** after multiple failures.  
- Introduce a **captcha challenge** (e.g., Google reCAPTCHA) for flagged login attempts.  

---

### 🔑 Role-Based Access Control (RBAC)  
⚠ **Observation:**  
- **No Role-Based Access Control (RBAC)** is currently implemented, meaning all authenticated users have the same access level.  

🔒 **Recommendations:**  
- Introduce **RBAC** to restrict access to administrative or privileged functionalities.  
- Define **user roles** such as `USER`, `ADMIN`, and potentially `MODERATOR` to enforce **least privilege principles**.  
- Implement **Spring Security role-based authorization** to control access to specific endpoints.  

---
 

### 🔐 API Security  
✔ **Strengths:**  
- API endpoints that modify user data require authentication.  

⚠ **Observations:**  
- **All TMDb API endpoints are publicly accessible**, increasing exposure.  
- **No rate limiting on public API requests**, making them vulnerable to excessive usage.  

🔒 **Recommendations:**  
- Apply **rate limiting** on public endpoints to prevent abuse.  
- Implement **IP-based throttling** for frequently requested APIs. 

---

### 🚨 Denial of Service (DoS) Protection  
✔ **Strengths:**  
- Uses efficient API design to handle multiple requests.  

⚠ **Observations:**  
- **No request rate limiting** on login and token generation endpoints.  
- **Excessive API calls** could degrade performance.  

🔒 **Recommendations:**  
- Implement **IP-based request limiting** to prevent abusive behavior.  
- Introduce **caching mechanisms** for frequently requested responses.  
- Monitor **high request spikes** to detect potential DoS attacks.


---
### 🔐 SQL Injection Protection  
✔ **Strengths:**  
- **Hibernate (JPA)** is used for database interactions, which **prevents SQL Injection** by utilizing **prepared statements** internally.  
- Queries are executed using **JPQL (Java Persistence Query Language)**, ensuring safe query execution without direct SQL manipulation.  
- No **native queries** are used, eliminating risks from manual string concatenation in database queries.  

⚠ **Potential Risks:**  
- While Hibernate prevents direct SQL Injection, **improper query construction** (e.g., dynamic query building with concatenation in JPQL) could still pose a risk.

---
### 🔒 HTTPS Enforcement  
⚠ **Observations:**  
- The application currently runs on **localhost**, so HTTPS enforcement is not required in development stage.  

🔒 **Recommendations for Production Deployment:**  
- Ensure **HTTPS is enforced** for all external requests when deploying to a live environment.  
---

## 🚀 CI/CD
We set up a **CI/CD pipeline** using **GitHub Actions** to streamline testing and maintain **code quality** across different environments. This pipeline automatically triggers on **every commit and pull request**, running **unit tests** to validate core functionalities.

### Key Features:
- **Automated backend unit testing** to ensure code reliability.
- **Prevents regressions** by verifying that new changes do not break existing functionality.
- **Locally hosted backend and database**, ensuring a stable and consistent development workflow.

This setup enhances the development process by providing **continuous validation** and maintaining a high level of **code integrity**.

---
### 🛠 Development Environment  

#### 🚀 Backend:  
- Runs locally using *Spring Boot*, started via mvn spring-boot:run.  
- Connects to a *MySQL database* set up in application.properties for development and testing.  
- Unit tests are executed to verify functionality before new features are integrated.  

#### 🎨 Frontend:  
- Developed using *HTML, CSS, and JavaScript* to provide an intuitive user interface.  
- Operates locally, communicating with the backend through *REST API requests*.  

---

### 🔬 Staging Environment  

#### ⚙ Backend:  
- Runs in a *staging setup, utilizing a **partially populated MySQL database* to simulate real data scenarios.  
- Allows for thorough testing before deployment to production.  

#### 🌍 Frontend:  
- Tested locally but configured to interact with the *staging backend* to ensure compatibility and performance under near-production conditions.  

---

### 🚀 Production Environment  

#### 🔧 Backend:  
- Fully deployed with a *live MySQL database*, containing actual user data.  
- Tuned for *high performance, security, and reliability* to handle real-world usage.  

#### 🌐 Frontend:  
- Rigorously tested and confirmed to work smoothly with the *production backend*, ensuring a seamless user experience.

     





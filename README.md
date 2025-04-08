# 📱 MovieMingle-MobileApp

## 🎯 Scopul Proiectului
**MovieMingle** este o aplicație mobile care recomandă filme utilizatorilor pe baza preferințelor lor. Aplicația îmbunătățește experiența de vizionare prin predicții realizate cu ajutorul tehnicilor de învățare automată. Cu o interfață prietenoasă și un design modern și atrăgător, MovieMingle devine partenerul ideal pentru pasionații de film care caută titluri noi, potrivite gusturilor lor. Indiferent dacă preferi drame, comedii sau thrillere, aplicația va oferi recomandări care se potrivesc așteptărilor tale.

### ❗ Adaptare backend din proiect web existent
Pentru a eficientiza procesul de dezvoltare și a reutiliza o bază solidă de cod, backend-ul aplicației MovieMingle a fost preluat dintr-un proiect de al nostru anterior cu versiune web. Acesta este construit în Java Spring Boot, conține deja logica de recomandare și endpoint-urile necesare, și a fost adaptat pentru a răspunde nevoilor unei aplicații mobile. Link-ul către repo-ul aplicației web se poate accesa [aici](https://github.com/unibuc-cs/software-engineering-product-4errors).

## ❓ De ce este importantă testarea?
Testarea aplicației este esențială pentru a garanta:
- Fiabilitatea și stabilitatea funcționalităților
- Prevenirea defectelor înainte ca aplicația să ajungă la utilizatori finali
- Asigurarea compatibilității cu diferite sisteme de operare și dispozitive
- Automatizarea testelor permite economisirea de timp în dezvoltare și lansare
- Ușurează mentenanța și scalarea aplicației în viitor

---

## 🧪 Tipuri de testare & Tehnologii aferente

### 1. Functional Testing
**Definiție:** Verifică dacă funcționalitățile aplicației se comportă conform cerințelor specificate.
- **Frontend:** [Detox](https://wix.github.io/Detox/) / [React Native Testing Library](https://testing-library.com/docs/react-native-testing-library/intro/)
- **Backend:** [JUnit 5](https://junit.org/junit5/) + [Mockito](https://site.mockito.org/)

### 2. Structural Testing (White-box)
**Definiție:** Testarea logicii interne a codului, cum ar fi condiții și ramuri.
- **Frontend:** [Jest](https://jestjs.io/)
- **Backend:** [JUnit](https://junit.org/junit5/)

### 3. Blackbox Testing
**Definiție:** Testare bazată pe input/output fără a cunoaște structura internă a codului.
- **Tehnologie:** [Appium](https://appium.io/) – cross-platform, folosit pentru testarea UI pe device-uri reale
- **Alternativă pentru API:** [Postman](https://www.postman.com/) + [Newman CLI](https://www.npmjs.com/package/newman)

### 4. Coverage Testing
**Definiție:** Măsoară cât din cod este acoperit de testele automate.
- **Frontend:** [Istanbul/NYC](https://github.com/istanbuljs/nyc)
- **Backend:** [JaCoCo](https://www.eclemma.org/jacoco/)

### 5. Random Testing
**Definiție:** Trimite inputuri aleatoare pentru a verifica stabilitatea aplicației.
- **Android:** [ADB Monkey Tool](https://developer.android.com/studio/test/monkey)
- **API:** [OWASP ZAP](https://www.zaproxy.org/) pentru fuzzing

### 6. Mutation Testing
**Definiție:** Testează eficiența testelor existente prin injectarea de erori controlate în cod.
- **Frontend:** [StrykerJS](https://stryker-mutator.io/docs/stryker-js/)
- **Backend:** [PITest](https://pitest.org/)

---

## 🧾 Descriere tehnologii de testare

- **Detox:** framework E2E pentru React Native care permite testarea automată a fluxurilor utilizatorului pe emulator sau simulator. Testele sunt scrise în JavaScript și rulează pe Jest. Ideal pentru testare UI și funcțională.

- **React Native Testing Library:** bibliotecă ce facilitează testarea componentelor React Native într-un mod asemănător comportamentului real al utilizatorului. Folosită pentru teste de integrare și de componentă.

- **Jest:** framework de testare JavaScript, utilizat pentru teste unitare și de integrare. Suportă mocks, coverage și rulează rapid în medii de dezvoltare moderne.
  
- **Appium:** framework de testare cross-platform ce permite testarea aplicațiilor mobile native, hibride sau web, pe Android/iOS, pe dispozitive reale sau virtuale. Scrii testele în diverse limbaje (JavaScript, Java, Python).

- **Espresso:** framework Android oferit de Google, foarte stabil pentru testarea UI-ului aplicațiilor native Android. Permite testare sincronă direct pe Android emulator sau device.

- **JUnit 5:** framework standard pentru testarea aplicațiilor Java. Folosit pentru teste unitare, de integrare și testarea logicii de business în backend-ul Spring Boot.

- **Mockito:** framework de mock în Java. Permite izolarea componentelor în timpul testelor unitare prin simularea comportamentului altor clase sau servicii.

- **Appium:** framework de testare cross-platform, permite scrierea de teste în diverse limbaje și executarea lor pe device-uri reale sau emulatoare. Ideal pentru testare black-box.

- **Postman & Newman:** unelte pentru testarea manuală și automată a API-urilor. Postman oferă o interfață vizuală, iar Newman rulează colecțiile Postman din linia de comandă.

- **JaCoCo:** generator de rapoarte de acoperire a codului pentru proiectele Java. Se integrează cu Gradle sau Maven.

- **Istanbul/NYC:** generator de rapoarte de coverage pentru cod JavaScript. Integrare nativă cu Jest.

- **ADB Monkey Tool:** utilitar Android care generează evenimente aleatoare pe un dispozitiv sau emulator pentru testare de stres.

- **OWASP ZAP:** unealtă pentru testare de securitate și fuzzing a aplicațiilor web și API-urilor.

- **StrykerJS:** motor de mutation testing pentru JavaScript. Verifică eficiența testelor prin generarea de „mutanți” în cod.

- **PITest:** tool pentru mutation testing în Java. Permite măsurarea calității testelor prin injectarea de bug-uri simulate.---

## 🤖 Analiza aplicațiilor existente



| Framework | Avantaje                          | Dezavantaje                     |
|-----------|-----------------------------------|---------------------------------|
| Detox     | Rapid, nativ, integrat cu CI      | Setup dificil pe Windows        |
| Appium    | Teste reale, limbaj agnostic      | Mai lent, consum resurse        |
| Jest      | Simplu, rapid pentru componente   | Nu face testare UI              |
| Espresso  | Stabil pentru Android             | Nu merge pe iOS                 |


### Detox vs Appium

| Criteriu           | Detox                            | Appium                          |
|--------------------|----------------------------------|----------------------------------|
| Tip testare        | End-to-End (React Native only)   | Black-box (cross-platform)      |
| Setup              | Mai ușor pentru RN               | Complex, necesită server        |
| Performanță        | Rapid, paralelizabil             | Mai lent, mai versatil          |
| Suport platforme   | Android & iOS (simulatoare)      | Android & iOS (device-uri reale)|
| Limbaje suportate  | JavaScript                       | JS, Java, Python, etc.          |


---

## ⚙️ CI/CD: GitHub Actions vs Bitrise

### 🔧 GitHub Actions
- Gratuit pentru proiecte open-source
- Ușor de integrat cu Detox, Jest, Postman
- Configurabil YAML
- [Documentație](https://docs.github.com/en/actions)

### 🛠️ Bitrise
- Platformă dedicată pentru aplicații mobile
- Build & test pe macOS și Android cloud machines
- UI prietenos pentru configurare pipelines
- [Documentație](https://devcenter.bitrise.io/)

### 🔍 Comparativ
| Criteriu       | GitHub Actions        | Bitrise                   |
|----------------|------------------------|---------------------------|
| Simplitate     | Configurabil prin YAML| UI vizual + workflow YAML |
| Target         | General DevOps        | Mobile DevOps dedicat     |
| Cost           | Gratuit open-source   | Planuri gratuite + plătite|
| Integrare RN   | Manuală               | Pre-configurată           |

---
## Configuratie hardware (to do)


---
## Configuratie software (to do)

---
## Unit testing in aplicatie

Testele unitare sunt concepute pentru a verifica corectitudinea metodelor și funcțiilor individuale. În cadrul aplicației **MovieMingle**, am implementat **49 de teste unitare** care acoperă funcționalități esențiale precum: construirea matricei de recomandare, înregistrarea utilizatorului, gestionarea parolelor, marcarea filmelor ca favorite, administrarea ratingurilor și managementul token-urilor de securitate.
Fiecare caz de test verifică rezultatele așteptate, iar **toate testele au fost trecute cu succes**. Mai jos se află un tabel sumar al principalelor cazuri de testare unitară:

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
---
## 📚 Resurse și Surse de Inspirație
- Bitrise Blog – [“React Native E2E UI testing with Detox and Bitrise”](https://www.bitrise.io/blog/react-native-e2e-ui-testing-with-detox-and-bitrise)
- Codecentric – [“Detox vs. Appium – a comparison” (2020)](https://blog.codecentric.de/en/2020/02/detox-vs-appium-comparison)
- [Detox Documentation (Wix)](https://wix.github.io/Detox)
- [Appium Official Site](https://appium.io/)
- [Jest Testing Framework](https://jestjs.io/)
- [React Native Testing Library Docs](https://testing-library.com/docs/react-native-testing-library/intro/)
- [JUnit 5 Official Documentation](https://junit.org/junit5/)


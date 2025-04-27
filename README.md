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
## 🖥️ Configuratie hardware
- CPU: Intel Core Ultra 9 185H,  Intel Core i7-9750H
- GPU: NVIDIA GeForce RTX 4060, NVIDIA GeForce GTX 1650
- RAM: 32 GB, 8 GB
- Stocare: SSD 512GB, SSD 477 GB capacitate totală configurat RAID

---
## 🖥️ Configuratie software
- SO: Microsoft Windows 11 Pro, Microsoft Windows 11 Pro
- IDE: JetBrains IntelliJ IDEA 2024.3.1.1, Visual Studio Code
- Runtime Java: OpenJDK 21 (pentru Spring Boot)

---
## 🧪 Unit testing in aplicatie
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


### JUnit si Mockito
Pentru testarea aplicației MovieMingle, în backend-ul dezvoltat cu Java Spring Boot, sunt utilizate două framework-uri complementare: JUnit 5 și Mockito. Mai jos realizăm o comparație între cele două, cu accent pe utilitate, ușurința în folosire și exemple de cod reale extrase din proiect.

#### 🎯 Scop, roluri și diferențe conceptuale
JUnit este framework-ul de bază pentru a scrie și executa teste în Java, în timp ce Mockito este folosit pentru a crea obiecte simulative (mock-uri) ale dependențelor. Ele sunt frecvent folosite împreună pentru a acoperi toate tipurile de teste unitare și de integrare.

| Framework | Utilitate principală                                           | Tip de testare                  |
|-----------|----------------------------------------------------------------|----------------------------------|
| JUnit     | Structurare, executare și organizare a testelor                | Testare unitară și de integrare |
| Mockito   | Simulare de dependențe (mock-uri), control al comportamentului | Testare unitară (izolată)       |

| Framework | Avantaje                                       | Limitări                                             |
|-----------|------------------------------------------------|------------------------------------------------------|
| JUnit     | Simplu de configurat, rulare directă în IDE    | Nu poate izola dependențe fără Mockito               |
| Mockito   | Flexibil, permite testarea în izolare completă | Necesită cunoștințe suplimentare (mocking, stubbing) |
---
📌 Exemplu 1 – Folosind doar JUnit
```java
@Test
public void testAddNumbers() {
    Calculator calc = new Calculator();
    int result = calc.add(2, 3);
    assertEquals(5, result);
}

```
Aici testăm direct metoda add fără nicio dependență externă. 

📌 Exemplu 2 – Folosind Mockito cu JUnit pentru simularea dependențelor
```java
@Mock
private EmailService emailService;

@InjectMocks
private DefaultAppUserService userService;

@Test
public void testRegister_Success() throws Exception {
    when(emailService.sendMail(any())).thenReturn(true);
    userService.register(userDto);
    verify(emailService, times(1)).sendMail(any());
}
```
Aici EmailService este simulat pentru a nu trimite un email real, ci doar pentru a verifica dacă a fost apelat corect.


---
🔍 Analiză și concluzie detaliată

- JUnit permite testarea metodelor individuale, asigurând că logica este corectă atunci când nu există dependențe externe.

- Mockito intervine atunci când clasa pe care o testăm interacționează cu alte clase sau servicii – în loc să apelăm efectiv un repository sau un serviciu de email, simulăm comportamentul lor.

- JUnit și Mockito funcționează cel mai bine împreună, oferind:

- Testare izolată, fără efecte secundare sau acces la baze de date reale

- Control total asupra comportamentului mock-urilor

- Verificări precise privind ce metode au fost apelate și cum
---
📌 Utilitate în MovieMingle:

- JUnit este folosit pentru testarea funcțiilor interne de prelucrare a datelor (ex: criptare parole, validare tokenuri).

- Mockito este folosit pentru a simula componente externe precum EmailService, SecureTokenService sau AppUserRepository, astfel încât testele să fie rapide, izolate și fiabile.
---
## Testare React Native (Frontend)
### Maestro
#### 1. Ce este Maestro?
**Maestro** este un framework de testare end-to-end destinat aplicațiilor mobile, care folosește un limbaj declarativ bazat pe YAML pentru a scrie teste pentru aplicațiile mobile. A fost creat pentru a oferi o soluție simplă și ușor de utilizat pentru testarea aplicațiilor mobile pe platformele **iOS** și **Android**, și este optimizat pentru aplicațiile care utilizează **Expo** și **Flutter**.
Maestro a câștigat rapid popularitate datorită ușurinței sale de utilizare, spre deosebire de alte framework-uri mai complexe, cum ar fi Detox, care necesită cunoștințe în JavaScript și configurări avansate. Maestro a fost creat cu scopul de a reduce complexitatea testării aplicațiilor mobile, astfel încât dezvoltatorii să poată începe rapid și să poată scrie teste de calitate cu un minim de efort.


#### 2. Maestro cu Expo
Expo este o platformă și un set de unelte pentru dezvoltarea aplicațiilor mobile folosind React Native. Maestro poate fi folosit cu aplicațiile Expo pentru a crea teste automate pentru aplicațiile mobile, care rulează pe dispozitive reale sau pe simulatoare/emulatoare.

Cum se folosește Maestro cu Expo?
- Expo Go este folosit pentru a rula aplicațiile Expo pe un dispozitiv mobil.
- Maestro poate automatiza interacțiunile cu aplicația mobilă rulată în Expo Go prin intermediul comenzilor de tip YAML.
  
Cum se integrează Maestro cu Expo

Pentru a folosi Maestro cu aplicațiile Expo, trebuie să urmezi câțiva pași simpli:
- **Transformarea aplicației Expo Go într-o aplicație nativă**: Acest lucru se face prin prebuild-ul aplicației (folosind `npx expo prebuild`), ceea ce permite rularea testelor în mediul nativ (folosind `npx expo run:android` sau `npx expo run:ios`).
- **Configurarea Maestro**: După ce aplicația a fost pre-construită, trebuie să te asiguri că IP-ul pe care rulează serverul Expo (obținut prin comanda `ipconfig` pe PC-ul tău) este corect configurat în fișierul `config.yaml` din proiectul Maestro.
- **Testarea aplicației**: Odată ce configurațiile sunt corecte, poți rula testele end-to-end folosind comenzile Maestro, care interacționează direct cu aplicația Expo construită.


#### 3. Setup-ul pentru a instala Maestro
Pentru a folosi Maestro pentru testarea aplicațiilor mobile, sunt urmati pașii de mai jos pentru a-l instala și configura corect:

- Instalarea Maestro

Maestro poate fi instalat global folosind **npm** (Node Package Manager). Trebuie instalate **Node.js** și **npm** înainte de a începe.
De asemenea, ar trebui descarcat zip-ul care contine Maestro, mai multe detalii [aici](https://docs.maestro.dev/getting-started/installing-maestro).

Se execută următoarea comandă în terminal pentru a instala Maestro:
```bash
npm install -g maestro
```
- Verificarea instalării
  
După instalare, se poate verifica dacă Maestro a fost instalat corect folosind următoarea comandă:
```bash
maestro --version
```
Aceasta ar trebui să returneze versiunea instalată a Maestro.


#### 4. Configurarea mediului pentru a rula testele Maestro (pentru Android)
Dupa configurarea aplicatiei si scrierea testelor, pentru a putea rula testele trebuie urmati urmatorii pasi:
- se deschide un terminal in care ne aflam in ../Backend (se acceseaza path-ul in care se afla folderul de Backend) si se porneste serverul de Springboot cu comanda `mvn spring-boot:run`
  - aici e foarte important ca in ../Frontend/api/config.js sa fie pus ip-ul computerului de pe care se ruleaza  (se poate identifica in terminal prin comanda `ipconfig` in sectiunea ***IPv4 Address***)
  - astfel se face legatura intre Backend si Frontend
- se deschide un alt terminal in care ne aflam in path-ul ../Frontend se ruleaza comanda `npx expo run:android`
  - trebuie asteptat raspunsul din terminal cu codul QR pentru a trece la pasul urmator
- se deschide un alt terminal in care ne aflam in ../Frontend/maestro (path-ul in care se afla testele Maestro) si se ruleaza `maestro test maestro/test-login.yaml` (test-login se poate inlocui cu numele testului care se doreste a fi rulat)
- foarte important, daca se doreste rularea pe telefonul real, trebuie inainte de toate acestea o configuratie speciala si pentru el


#### 5. Setup telefon: Permisiuni de dezvoltator și USB debugging (pentru Android)
Pentru a conecta un telefon la PC pentru a rula aplicația în test, trebuie activate opțiunile de dezvoltator și USB debugging:
- Activează opțiunile de dezvoltator:
  - Mergi la Setări -> Despre telefon -> apasă de 10 ori pe Numărul versiunii pentru a activa opțiunile de dezvoltator.
- Activează USB debugging:
  - Mergi în Setări -> Opțiuni pentru dezvoltatori și activează USB debugging.
- Conectează telefonul la computer prin cablu USB.
- Acceptă permisiunile de pe telefon pentru a permite conexiunea de dezvoltator.


#### 6. Descrierea testelor Maestro
In cadrul aplicatiei noastre am realizat 4 teste E2E cu Maestro

1. `test-login.yaml`
   
In acest fisier este testata interactiunea utilizatorului cu Screen-ul care apare la launch-ul aplicatiei si are loc actiunea de log-in cu credentialele unui cont deja existent pentru a se testa faptul ca logarea se desfasoara precum asteptarilor.
```yaml
appId: com.ncraluca.Frontend
--- 
- launchApp
- tapOn: "Log In"
- tapOn: "Enter your email"
- inputText: "ralucanegoita13@gmail.com"
- tapOn: "Enter your password"
- inputText: "1213.Ralu"
- tapOn: "Log in"
- tapOn: "Log in"
- assertVisible: "You're now logged in!"
- tapOn: "OK"

```
2. `test-profile.yaml`

In acest fisier este testata interactiunea utilizatorului dintre un Screen oarecare din aplicatie si Screen-ul de profile astfel:
- este accesat Screen-ul de profile
- utilizatorul apasa pe "Change Avatar" pentru a selecta un alt avatar
- deoarece Maestro functioneaza majoritar pe text si nu interactioneaza bine cu pozele, am ales ca interactiunea sa se finalizeze prin apasarea butonului "Cancel"
```yaml
appId: com.ncraluca.Frontend
---
- tapOn: "Your Profile"
- assertVisible: "Your Profile"
- tapOn: "Change Avatar"
- assertVisible: "Choose Your Avatar"
- tapOn: "Cancel"
```
3. `test-home.yaml`
   
In acest fisier este testata interactiunea utilizatorului dintre un Screen oarecare din aplicatie si Screen-ul de home astfel:
- se acceseaza screen-ul de Home
- se apasa pe butonul de "See More" pentru primul film care apare pe ecran
- se asteapta incarcarea detaliilor filmului
- se adauga la favorite filmul
- se adauga la watched filmul
- se scoate filmul de la favorite
- se scoate filmul din watched
```yaml
appId: com.ncraluca.Frontend
---
- tapOn: "Home"
- assertVisible: "Home"
- tapOn: "▶ See More"
- waitForAnimationToEnd
- assertVisible: "Add to Favorite"
- tapOn: "Add to Favorite"
- assertVisible: "Mark as Watched"
- tapOn: "Mark as Watched"
- assertVisible: "Added to Favorites"
- tapOn: "Added to Favorites"
- assertVisible: "Watched"
- tapOn: "Watched"
```

4. `test-search.yaml`
   
In acest fisier este testata interactiunea utilizatorului dintre un Screen oarecare din aplicatie si Screen-ul de search astfel:
- se acceseaza screen-ul de Search
- se cauta un film dupa keyword-ul "Bullet"
- se cauta filme dupa genul "Action"
- se caura filme si dupa genul "Animation"
- se deselecteaza "Action
- se deselecteaza "Animation"
```yaml
appId: com.ncraluca.Frontend
---
- tapOn: "Search"
- assertVisible: "🎬 Movie Explorer"
- tapOn: "Search for movies..."
- inputText: "Bullet"
- tapOn: "Action"
- tapOn: "Action"
- assertVisible: "Action"
- tapOn: "Animation"
- assertVisible: "Animation"
- tapOn: "Action"
- tapOn: "Animation"
```


#### 7. De unde se ia appId pentru teste
AppId-ul se poate găsi în fișierul app.json din proiectul Expo. Acesta este un identificator unic al aplicației.
```json
{
  "expo": {
    "name": "Frontend",
    "slug": "Frontend",
    "android": {
      "package": "com.ncraluca.Frontend"
    }
  }
}
```
AppId-ul în acest caz este ***com.ncraluca.Frontend***.


#### 8. Comparatie între Maestro și Detox
Testarea aplicațiilor mobile a devenit o componentă crucială în dezvoltarea de software, iar pentru dezvoltatorii de aplicații React Native, Detox și Maestro sunt două dintre cele mai populare framework-uri de testare end-to-end. Ambele oferă soluții eficiente pentru testarea aplicațiilor pe dispozitive fizice și simulatoare, dar fiecare are caracteristicile și avantajele sale. În această comparație detaliată, vom explora fiecare framework în parte, subliniind punctele forte ale fiecăruia, diferențele între ele și la ce tipuri de proiecte se potrivesc cel mai bine.

Ce este Detox?

Detox este un framework de testare end-to-end pentru aplicațiile React Native. Acesta a fost dezvoltat de Wix și este unul dintre cele mai populare framework-uri de testare pentru React Native, fiind adesea utilizat pentru a testa aplicații în mod real, pe dispozitive sau simulatoare iOS și Android. Detox folosește JavaScript pentru a scrie teste și oferă un set de API-uri care permit dezvoltatorilor să controleze aplicațiile, să simuleze interacțiuni și să verifice comportamentele aplicațiilor. Detox se integrează bine cu Jest, oferind o soluție robustă pentru testarea automată a aplicațiilor.

Avantaje Detox
- Suport complet pentru React Native: Detox este construit special pentru aplicațiile React Native, oferind un control detaliat asupra comportamentului aplicațiilor, cu acces la API-urile native.
- Testare pe dispozitive reale: Detox permite testarea pe dispozitive reale, ceea ce este esențial pentru verificarea comportamentului aplicației în condiții reale.
- Flexibilitate și control: Detox oferă un control detaliat asupra aplicațiilor, incluzând suport pentru gesturi, sincronizare cu aplicațiile și verificarea unor stări foarte specifice ale aplicației.
- Comunitate activă: Detox are o comunitate mare și activă, iar documentația este foarte bine structurată, ceea ce face mai ușor să înveți și să folosești framework-ul.

Dezavantaje Detox:
- Configurare complexă: Configurarea Detox pe Android și iOS poate fi o provocare, mai ales pentru dezvoltatorii care nu sunt familiarizați cu configurările avansate ale mediului de dezvoltare.
- Limbaj JavaScript: Detox folosește JavaScript, ceea ce poate să nu fie ideal pentru toți dezvoltatorii. De asemenea, pentru dezvoltatorii care preferă limbaje mai declarative, această abordare poate părea un pic mai complicată.

Ce este Maestro?

Maestro este un framework de testare mai recent, care promite o abordare mai simplă și mai ușor de învățat pentru testarea aplicațiilor mobile. Spre deosebire de Detox, care folosește JavaScript, Maestro folosește YAML pentru a scrie teste, ceea ce îl face foarte accesibil pentru cei care nu sunt familiarizați cu programarea. Maestro poate fi folosit atât pentru aplicațiile React Native, cât și pentru aplicațiile Flutter, oferind o soluție unificată pentru ambele platforme. Acesta este optimizat pentru testarea aplicațiilor care folosesc Expo, un alt motiv pentru care devine tot mai popular printre dezvoltatorii React Native care folosesc Expo în procesul lor de dezvoltare.

Avantaje Maestro:
- Configurare simplă și rapidă: Maestro are o configurare mult mai simplă decât Detox. Testele sunt scrise în YAML, iar configurarea este minimă, făcându-l o alegere excelentă pentru echipele care doresc să înceapă rapid cu testele end-to-end.
- Suport pentru Expo și Flutter: Maestro este ideal pentru aplicațiile care folosesc Expo sau Flutter. Dacă dezvoltatorul folosește Expo Go pentru a construi aplicațiile sale, Maestro poate fi integrat rapid pentru a efectua testele end-to-end, fără necesitatea unei configurații avansate.
- Ușor de învățat: Deoarece folosirea YAML este mult mai simplă și mai declarativă decât programarea în JavaScript, dezvoltatorii care nu sunt familiarizați cu limbaje de programare complexe pot învăța rapid cum să scrie teste cu Maestro.
- Suport cross-platform: Maestro poate fi folosit pe Android și iOS, făcându-l o alegere bună pentru aplicațiile care trebuie să ruleze pe ambele platforme.

Dezavantaje Maestro:
- Mai puțin flexibil: În comparație cu Detox, Maestro oferă mai puține opțiuni de personalizare și mai puțin control asupra detaliilor aplicației. De exemplu, dezvoltatorii nu pot simula la fel de multe interacțiuni avansate sau comportamente native ale aplicației.
- Nou pe piață: Deși este în creștere, Maestro nu are încă o comunitate la fel de mare ca Detox, iar documentația nu este la fel de detaliată în comparație cu Detox.
  
Comparație Detaliată între Detox și Maestro:
| Caracteristică          | Detox                                          | Maestro                                      |
|-------------------------|------------------------------------------------|----------------------------------------------|
| Limbaj de programare     | JavaScript (Jest)                              | YAML (declarativ)                            |
| Configurare              | Complexă (mai multe setări, nevoie de configurare manuală pentru Android/iOS) | Simplă, mai rapidă, optimizată pentru Expo  |
| Suport Expo              | Limitat                                        | Complet (ideal pentru aplicațiile Expo)      |
| Suport Flutter           | Nu                                             | Da (suport cross-platform)                   |
| Flexibilitate            | Mare, cu control detaliat asupra aplicației    | Limitată comparativ cu Detox                 |
| Ușurință de învățare     | Medie (necesită cunoștințe de JavaScript și configurări avansate) | Ridicată (folosirea YAML este ușor de învățat)|
| Suport CI/CD             | Da (integrare completă în CI)                  | Da (se integrează ușor în pipeline-urile CI) |
| Comunitate               | Mare și activă                                  | În creștere, dar mai mică în comparație cu Detox |

---
## 📚 Resurse și Surse de Inspirație
- Bitrise Blog – [“React Native E2E UI testing with Detox and Bitrise”](https://www.bitrise.io/blog/react-native-e2e-ui-testing-with-detox-and-bitrise)
- Codecentric – [“Detox vs. Appium – a comparison” (2020)](https://blog.codecentric.de/en/2020/02/detox-vs-appium-comparison)
- [Detox Documentation (Wix)](https://wix.github.io/Detox)
- [Appium Official Site](https://appium.io/)
- [Jest Testing Framework](https://jestjs.io/)
- [React Native Testing Library Docs](https://testing-library.com/docs/react-native-testing-library/intro/)
- [JUnit 5 Official Documentation](https://junit.org/junit5/)
- [Documentația Oficială Detox](https://wix.github.io/Detox/)
- [Documentația Oficială Maestro:](https://docs.maestro.dev/)
- [Detox vs Maestro Comparison on Medium](https://medium.com/@joemcguinness/choosing-a-new-framework-for-mobile-ui-testing-for-react-native-08f1cd3a4042)
- [End-to-end Testing Mobile Apps with Maestro](https://hybridheroes.de/blog/end-to-end-testing-maestro/)

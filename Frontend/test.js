import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { jwtDecode } from "jwt-decode";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywic3ViIjoiam9obkBleGFtcGxlLmNvbSIsImV4cCI6MTk5OTk5OTk5OX0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
const decoded = jwtDecode(token);
console.log("DECODED TOKEN", decoded);

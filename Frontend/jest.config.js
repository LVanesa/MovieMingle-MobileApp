export default {
  preset: "jest-expo",
  setupFiles: ["./jestSetup.js"], // ➔ AICI adăugăm!
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native|@react-navigation|expo(nent)?|expo-modules-core|native-base|react-native-svg|react-native-safe-area-context)/)",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

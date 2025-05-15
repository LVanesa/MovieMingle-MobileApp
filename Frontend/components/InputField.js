import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  secureTextEntry = false,
  keyboardType = "default",
  testID,
  accessibilityLabel,
}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        keyboardType={keyboardType}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
  label: {
    color: "#fff",
    marginBottom: 4,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  inputError: {
    borderColor: "#FF6B6B",
    borderWidth: 1,
  },
  error: {
    color: "#FF6B6B",
    fontSize: 13,
    marginTop: 4,
  },
});

export default InputField;

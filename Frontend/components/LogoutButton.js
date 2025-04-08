import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../store/auth-context";

const LogoutButton = () => {
  const authCtx = useContext(AuthContext);

  return (
    <TouchableOpacity onPress={authCtx.logout} style={{ marginRight: 15 }}>
      <Ionicons name="log-out-outline" size={24} color="#fff" />
    </TouchableOpacity>
  );
};

export default LogoutButton;

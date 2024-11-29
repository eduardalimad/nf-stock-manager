import React from "react";
import colors from "../styles/colors";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  title: string;
  onPress?: () => void;
}

export function ButtonApp({ title, onPress }: Props) {
  return (
    <TouchableOpacity 
      style={styles.buttonContainer} 
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.green,
    borderRadius: 20,
    width: "70%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.green,
    position: "relative",
  },
  buttonText: {
    color: colors.textPrimary,
    fontSize: 14,
  },
});

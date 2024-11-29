import React, { useState } from "react";
import { Text, StyleSheet, TextInput, View, TouchableOpacity, Keyboard } from "react-native";
import colors from "../styles/colors";

interface Props {
  title: string;
  condition: string;
}

export function Input({ condition, title }: Props) {
  const [text, setText] = useState('aa');
  const isEditable = condition === 'active';

  const handlePress = () => {
    if (!isEditable) {
      Keyboard.dismiss();
    }
  };

  return (
    <View style={[styles.inputContainer, { width: isEditable ? '48%' : '100%' }]}>
      <Text style={styles.label}>{title}</Text>
      <TouchableOpacity onPress={handlePress} activeOpacity={isEditable ? 1 : 0.6}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isEditable ? colors.background : colors.contrastGrey,
              color: isEditable ? colors.textPrimary : colors.textSecondary,
            },
          ]}
          value={text}
          onChangeText={setText}
          keyboardType="numeric"
          editable={isEditable}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    padding: 4,
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
    color: 'black',
  },
  input: {
    height: 40,
    borderRadius: 8,
    marginBottom: 5,
    textAlign: "center",
  },
});

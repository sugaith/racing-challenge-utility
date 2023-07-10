import { Pressable, Text } from "react-native";
import React from "react";
import { style } from "./styles";

type ButtonProps = {
  label: string;
  onPress: () => void;
};

const Button = ({ label, onPress }: ButtonProps) => {
  return (
    <Pressable onPress={onPress} style={style.buttonContainer}>
      <Text style={style.buttonText}>{label}</Text>
    </Pressable>
  );
};

export { Button };
export type { ButtonProps };

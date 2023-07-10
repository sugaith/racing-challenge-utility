import { RacerItemProps } from "./types";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import React from "react";

const RacerItem = ({ racer }: RacerItemProps) => {
  const { name, length, color, weight, winChance } = racer;

  return (
    <Pressable>
      <View>
        <Text>
          <Text>Name: </Text>
          {name}
        </Text>
        <Text>
          <Text>length: </Text>
          {length}
        </Text>
        <Text>
          <Text>weight: </Text>
          {weight}
        </Text>
        <Text>
          <Text>color: </Text>
          {color}
        </Text>
      </View>
      {winChance === "loading" && <ActivityIndicator />}
      {typeof winChance === "number" && <Text>{winChance * 100}</Text>}
    </Pressable>
  );
};

export { RacerItem };

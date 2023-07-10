import { RacerItemProps } from "./types";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import React from "react";
import { racerItemStyle } from "./styles";

const RacerItem = ({ racer, index }: RacerItemProps) => {
  const { name, length, color, weight, winChance } = racer;

  const rowStyle =
    index % 2 ? { backgroundColor: "#7b63de" } : { backgroundColor: "#e1e1e1" };

  return (
    <View style={[racerItemStyle.container, rowStyle]}>
      <View style={racerItemStyle.racerInfo}>
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
      <View style={racerItemStyle.racerResult}>
        {winChance === "loading" && <ActivityIndicator />}
        {typeof winChance === "number" && (
          <>
            <Text>{"Chance of Win:"}</Text>
            <Text>{Math.round(winChance * 10000) / 100} %</Text>
          </>
        )}
      </View>
    </View>
  );
};

export { RacerItem };

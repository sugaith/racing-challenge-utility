import { RacerListProps } from "./types";
import { FlatList, Text } from "react-native";
import { RacerItem } from "./RacerItem";
import React from "react";

const RacersList = ({ racers }: RacerListProps) => {
  if (racers.length === 0) {
    return <Text>No racers</Text>;
  }

  return (
    <FlatList
      data={racers}
      renderItem={({ item, index }) => <RacerItem racer={item} index={index} />}
      keyExtractor={(racer) => racer.name}
    />
  );
};

export { RacersList };

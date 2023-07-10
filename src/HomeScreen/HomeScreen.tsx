import React, { useCallback, useEffect } from "react";
import { ActivityIndicator, Text, Pressable, View } from "react-native";
import { useLazyQuery } from "@apollo/client";
import { useStore } from "../Store";
import { generateRacerWinLikelihoodCalculator } from "../likelihoodCalculator";
import { QUERY_RACERS, Racer, RacersResponse } from "../api/Racers";
import { RacersList } from "./RacersList";

const HomeScreen = () => {
  const currentRacing = useStore((state) => state.currentRacing);
  const setCurrentRacing = useStore((state) => state.setCurrentRacing);
  const setAllToLoading = useStore((state) => state.setAllToLoading);
  const setRacerWinChance = useStore((state) => state.setRacerWinChance);
  const [queryRacers, { data, loading, error }] = useLazyQuery<RacersResponse>(
    QUERY_RACERS,
    {
      fetchPolicy: "network-only",
    },
  );

  useEffect(() => {
    if (!data?.racers) return;
    setCurrentRacing(data.racers);
  }, [data, setCurrentRacing]);

  const calculateWinChanceForAll = useCallback(() => {
    currentRacing.forEach(async (racer: Racer, pos: number) => {
      const racerWinCalculator = generateRacerWinLikelihoodCalculator();

      const saveResult = (winChance: number) => {
        setRacerWinChance(winChance, pos);
      };

      racerWinCalculator(saveResult);
    });
  }, [currentRacing, setRacerWinChance]);

  if (error) {
    return (
      <Text>{`Error when fetching racers: ${JSON.stringify(error)}`}</Text>
    );
  }

  const startRacing = () => {
    setAllToLoading();
    calculateWinChanceForAll();
  };

  return (
    <View>
      <Pressable onPress={() => queryRacers()}>
        <Text> Get new Racers </Text>
      </Pressable>

      {loading ? (
        <ActivityIndicator size="large" color={"#b017d5"} />
      ) : (
        <RacersList racers={currentRacing} />
      )}

      {currentRacing.length > 0 && !loading && (
        <Pressable onPress={startRacing}>
          <Text>Start Racing!</Text>
        </Pressable>
      )}
    </View>
  );
};

export { HomeScreen };

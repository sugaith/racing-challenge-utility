import React, { useCallback, useEffect, useMemo } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useLazyQuery } from "@apollo/client";
import { useStore } from "../../Store";
import {
  generateRacerWinLikelihoodCalculator,
  sortRacersByChance,
} from "../../utils";
import { QUERY_RACERS, Racer, RacersResponse } from "../../api/Racers";
import { RacersList } from "./RacersList";
import { Button } from "../Button/Button";

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

  const sortedRacers = useMemo(() => {
    const racingCopy = [...currentRacing];

    return racingCopy.sort(sortRacersByChance);
  }, [currentRacing]);

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
      <Button label={"Get new Racers"} onPress={() => queryRacers()} />

      {loading ? (
        <ActivityIndicator size="large" color={"#b017d5"} />
      ) : (
        <RacersList racers={sortedRacers} />
      )}

      {currentRacing.length > 0 && !loading && (
        <Button label={"Start Racing!"} onPress={startRacing} />
      )}
    </View>
  );
};

export { HomeScreen };

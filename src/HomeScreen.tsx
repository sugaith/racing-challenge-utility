import {
  ActivityIndicator,
  Text,
  FlatList,
  Pressable,
  View,
} from "react-native";
import { gql, useLazyQuery } from "@apollo/client";
import { useCallback, useEffect } from "react";
import { useStore } from "./Store";
import { generateRacerWinLikelihoodCalculator } from "./likelihoodCalculator";

const QUERY_RACERS = gql`
  query Racers {
    racers {
      name
      length
      color
      weight
    }
  }
`;
export type Racer = {
  name: string;
  length: number;
  color: string;
  weight: number;
  winChance?: number | "loading";
};

type RacerListProps = {
  racers: Racer[];
};

type RacerItemProps = {
  racer: Racer;
};

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

const RacersList = ({ racers }: RacerListProps) => {
  if (racers.length === 0) {
    return <Text>No racers</Text>;
  }

  return (
    <FlatList
      data={racers}
      renderItem={({ item }) => <RacerItem racer={item} />}
      keyExtractor={(racer) => racer.name}
    />
  );
};

type RacersResponse = {
  racers: Racer[] | null;
};

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

  console.log("view updates---> ", currentRacing);

  const setupRacing = () => {
    if (!data?.racers) return;
    setCurrentRacing(data.racers);
  };
  useEffect(setupRacing, [data]);

  const calculateWinChanceForAll = useCallback(() => {
    console.log("calculateWinChanceForAll");
    console.log(currentRacing.length);

    currentRacing.forEach(async (racer: Racer, pos: number) => {
      const racerWinCalculator = generateRacerWinLikelihoodCalculator();

      const saveResult = (winChance: number) => {
        setRacerWinChance(winChance, pos);
      };

      racerWinCalculator(saveResult);
    });
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

export default HomeScreen;

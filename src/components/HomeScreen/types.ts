import { Racer } from "../../api/Racers";

type RacerListProps = {
  racers: Racer[];
};

type RacerItemProps = {
  racer: Racer;
};

const homeScreenOptions = {
  headerStyle: {
    backgroundColor: "#29128e",
  },
  headerTintColor: "#ffffff",
};

export type { RacerListProps, RacerItemProps };
export { homeScreenOptions };

import { gql } from "@apollo/client";

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

type Racer = {
  name: string;
  length: number;
  color: string;
  weight: number;
  winChance?: number | "loading";
};

type RacersResponse = {
  racers: Racer[] | null;
};

export { QUERY_RACERS };
export type { Racer, RacersResponse };

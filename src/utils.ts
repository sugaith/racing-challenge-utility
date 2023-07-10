import { Racer } from "./api/Racers";

const generateRacerWinLikelihoodCalculator = () => {
  const delay = 7000 + Math.random() * 7000;
  const likelihoodOfRacerWinning = Math.random();

  return (callback: (result: number) => void) => {
    setTimeout(() => {
      callback(likelihoodOfRacerWinning);
    }, delay);
  };
};

const sortRacersByChance = (curr: Racer, next: Racer) => {
  const currChance = typeof curr.winChance === "number" ? curr.winChance : -1;
  const nextChance = typeof next.winChance === "number" ? next.winChance : -1;

  return nextChance - currChance;
};

export { generateRacerWinLikelihoodCalculator, sortRacersByChance };

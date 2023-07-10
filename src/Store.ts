import { create } from "zustand";
import { Racer } from "./HomeScreen/HomeScreen";

type StoreType = {
  currentRacing: Racer[];
  setCurrentRacing: (racing: Racer[]) => void;
  setRacerWinChance: (winChance: number, racerPos: number) => void;
  setAllToLoading: () => void;
};

export const useStore = create<StoreType>((set) => ({
  currentRacing: [],
  setCurrentRacing: (racing: Racer[]) => set(() => ({ currentRacing: racing })),

  setRacerWinChance: (winChance: number, racerPos: number) =>
    set((state) => {
      const newRacing = [...state.currentRacing];
      newRacing[racerPos].winChance = winChance;

      return { currentRacing: newRacing };
    }),

  setAllToLoading: () =>
    set((state) => {
      const updatedRacing: Racer[] = state.currentRacing.map((racer) => ({
        ...racer,
        winChance: "loading",
      }));

      return { currentRacing: updatedRacing };
    }),
}));

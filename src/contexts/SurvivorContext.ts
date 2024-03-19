import { createContext, useContext } from "react";
import { Survivor } from "@/types";

interface SurvivorContextType {
  survivors: Survivor[]; // Update this with the actual type of survivors array
  addSurvivor: (newSurvivor: Survivor) => void; // Update this with the actual type of addSurvivor function
}

// Define SurvivorContext
const SurvivorContext = createContext<SurvivorContextType>({
  survivors: [],
  addSurvivor: () => {},
});

// Custom hook to consume SurvivorContext
export const useSurvivorContext = (): SurvivorContextType =>
  useContext(SurvivorContext);

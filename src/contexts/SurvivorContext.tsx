import { ReactNode, createContext, useContext, useState } from "react";

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

interface SurvivorProviderProps {
  children: ReactNode;
}

const SurvivorProvider: React.FC<SurvivorProviderProps> = ({ children }) => {
  const [survivors, setSurvivors] = useState<Survivor[]>([]);

  const addSurvivor = (newSurvivor: Survivor) => {
    setSurvivors([...survivors, newSurvivor]);
  };

  return (
    <SurvivorContext.Provider value={{ survivors, addSurvivor }}>
      {children}
    </SurvivorContext.Provider>
  );
};

export { SurvivorProvider, SurvivorContext };

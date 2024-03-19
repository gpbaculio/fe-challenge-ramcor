import { ReactNode, createContext, useContext, useState } from "react";

import { Survivor, inventoryItemType } from "@/types";
interface SurvivorContextType {
  survivors: Survivor[];
  addSurvivor: (newSurvivor: Survivor) => void;
  listSurvivorInventory: (survivorId: string) => inventoryItemType[] | null;
  listItemsBySurvivor: (survivorId: string) => inventoryItemType[] | null;
  requestItemFromSurvivor: (
    requesterId: string,
    survivorId: string,
    itemId: string
  ) => void;
}

const initialSurvivors: Survivor[] = [];

const SurvivorContext = createContext<SurvivorContextType>({
  survivors: initialSurvivors,
  addSurvivor: () => {},
  listSurvivorInventory: () => null,
  listItemsBySurvivor: () => null,
  requestItemFromSurvivor: () => {},
});

interface SurvivorProviderProps {
  children: ReactNode;
}

const SurvivorProvider: React.FC<SurvivorProviderProps> = ({ children }) => {
  const [survivors, setSurvivors] = useState<Survivor[]>(initialSurvivors);

  const addSurvivor = (newSurvivor: Survivor) => {
    setSurvivors([...survivors, newSurvivor]);
  };

  const listSurvivorInventory = (
    survivorId: string
  ): inventoryItemType[] | null => {
    const survivor = survivors.find((survivor) => survivor.id === survivorId);
    return survivor ? survivor.inventory : null;
  };

  const listItemsBySurvivor = (
    survivorId: string
  ): inventoryItemType[] | null => {
    const survivor = survivors.find((survivor) => survivor.id === survivorId);
    return survivor ? survivor.inventory : null;
  };

  const requestItemFromSurvivor = (
    requesterId: string,
    survivorId: string,
    itemId: string
  ) => {
    const requesterIndex = survivors.findIndex(
      (survivor) => survivor.id === requesterId
    );
    const survivorIndex = survivors.findIndex(
      (survivor) => survivor.id === survivorId
    );
    if (requesterIndex !== -1 && survivorIndex !== -1) {
      const updatedSurvivors = [...survivors];
      const itemIndex = updatedSurvivors[survivorIndex].inventory.findIndex(
        (item) => item.itemId === itemId
      );
      if (itemIndex !== -1) {
        // Item found in survivor's inventory
        updatedSurvivors[requesterIndex].inventory.push(
          updatedSurvivors[survivorIndex].inventory[itemIndex]
        );
        // Remove item from survivor's inventory
        updatedSurvivors[survivorIndex].inventory.splice(itemIndex, 1);
        setSurvivors(updatedSurvivors);
      }
    }
  };

  return (
    <SurvivorContext.Provider
      value={{
        survivors,
        addSurvivor,
        listSurvivorInventory,
        listItemsBySurvivor,
        requestItemFromSurvivor,
      }}
    >
      {children}
    </SurvivorContext.Provider>
  );
};

export { SurvivorProvider, SurvivorContext };

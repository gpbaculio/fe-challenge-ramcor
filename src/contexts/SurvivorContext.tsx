"use client";

import { ReactNode, createContext, useContext, useState } from "react";

import { Survivor, inventoryItemType } from "@/types";
interface SurvivorContextType {
  survivors: Survivor[];
  addSurvivor: (newSurvivor: Survivor) => void;
  listSurvivorInventory: (survivorId: string) => inventoryItemType[] | null;
  listItemsBySurvivor: (survivorId: string) => inventoryItemType[] | null;
  requestItemFromSurvivor: (survivorId: string, itemId: string) => void;
  addItemFromSurvivor: (survivorId: string, itemId: string) => void;
}

const initialSurvivors: Survivor[] = [
  {
    id: "1",
    name: "John Doe",
    age: 30,
    gender: "male",
    lastLocation: { latitude: 40.7128, longitude: -74.006 },
    inventory: [
      { itemId: "water", quantity: 5 },
      { itemId: "food", quantity: 10 },
    ],
    infected: false,
  },
  {
    id: "2",
    name: "Jane Smith",
    age: 25,
    gender: "female",
    lastLocation: { latitude: 34.0522, longitude: -118.2437 },
    inventory: [{ itemId: "medication", quantity: 3 }],
    infected: true,
  },
  {
    id: "3",
    name: "Alice Johnson",
    age: 35,
    gender: "female",
    lastLocation: { latitude: 51.5074, longitude: -0.1278 },
    inventory: [
      { itemId: "food", quantity: 8 },
      { itemId: "water", quantity: 4 },
    ],
    infected: false,
  },
  {
    id: "4",
    name: "Bob Brown",
    age: 45,
    gender: "male",
    lastLocation: { latitude: 48.8566, longitude: 2.3522 },
    inventory: [{ itemId: "medication", quantity: 2 }],
    infected: true,
  },
  {
    id: "5",
    name: "Emily Davis",
    age: 20,
    gender: "other",
    lastLocation: { latitude: 35.6895, longitude: 139.6917 },
    inventory: [
      { itemId: "food", quantity: 6 },
      { itemId: "water", quantity: 7 },
      { itemId: "medication", quantity: 1 },
    ],
    infected: false,
  },
];

const SurvivorContext = createContext<SurvivorContextType>({
  survivors: initialSurvivors,
  addSurvivor: () => {},
  listSurvivorInventory: () => null,
  listItemsBySurvivor: () => null,
  requestItemFromSurvivor: () => {},
  addItemFromSurvivor: () => {},
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
  // descreases the quantity of the item by 1
  const requestItemFromSurvivor = (survivorId: string, itemId: string) => {
    const survivorIndex = survivors.findIndex(
      (survivor) => survivor.id === survivorId
    );
    if (survivorIndex !== -1) {
      const updatedSurvivors = [...survivors];
      const itemIndex = updatedSurvivors[survivorIndex].inventory.findIndex(
        (item) => item.itemId === itemId
      );
      if (itemIndex !== -1) {
        // Decrease the quantity of the item by 1
        updatedSurvivors[survivorIndex].inventory[itemIndex].quantity -= 1;
        setSurvivors(updatedSurvivors);
      }
    }
  };

  const addItemFromSurvivor = (survivorId: string, itemId: string) => {
    const survivorIndex = survivors.findIndex(
      (survivor) => survivor.id === survivorId
    );

    if (survivorIndex !== -1) {
      const updatedSurvivors = [...survivors];
      const itemIndex = updatedSurvivors[survivorIndex].inventory.findIndex(
        (item) => item.itemId === itemId
      );
      if (itemIndex !== -1) {
        // Decrease the quantity of the item by 1
        updatedSurvivors[survivorIndex].inventory[itemIndex].quantity += 1;
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
        addItemFromSurvivor,
      }}
    >
      {children}
    </SurvivorContext.Provider>
  );
};

export const useSurvivorContext = () => useContext(SurvivorContext);

export { SurvivorProvider, SurvivorContext };

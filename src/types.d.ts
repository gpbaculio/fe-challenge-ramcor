export type inventoryItemType = {
  itemId: Item["id"];
  quantity: number;
};
export interface Survivor {
  id: string;
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  lastLocation: {
    latitude: number;
    longitude: number;
  };
  inventory: inventoryItemType[];
  infected: boolean;
}

export enum ItemOption {
  Water = "Water",
  Food = "Food",
  Medication = "Medication",
  CVirusVaccine = "C-Virus Vaccine",
}

export interface Item {
  id: string;
  name: ItemOption;
  description: string;
}

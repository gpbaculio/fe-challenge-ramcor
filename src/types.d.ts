export interface Survivor {
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  lastLocation: {
    latitude: number;
    longitude: number;
  };
  inventory: {
    itemId: Item["id"];
    quantity: number;
  }[];
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

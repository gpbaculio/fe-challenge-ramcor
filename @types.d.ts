interface Survivor {
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  lastLocation: {
    latitude: number;
    longitude: number;
  };
  inventory: {
    itemId: string;
    quantity: number;
  }[];
  infected: boolean;
}

enum ItemOption {
  Water = "Water",
  Food = "Food",
  Medication = "Medication",
  CVirusVaccine = "C-Virus Vaccine",
}

interface Item {
  id: string;
  name: ItemOption;
  description: string;
}

"use client";
import SurvivorContext from "@/contexts/SurvivorContext";
import React, { useContext } from "react";

const DefaultPage = () => {
  const { survivors } = useContext(SurvivorContext);

  // Calculate total number of survivors
  const totalSurvivors = survivors.length;

  // Calculate total number of inventories
  const totalInventoryItems = survivors.reduce((acc, survivor) => {
    // Sum up the quantity of each inventory item for the current survivor
    const inventoryItemsCount = survivor.inventory.reduce((itemAcc, item) => {
      return itemAcc + item.quantity;
    }, 0);
    // Add the quantity of inventory items for the current survivor to the accumulator
    return acc + inventoryItemsCount;
  }, 0);

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Home</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-md p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-black">
              Total Survivors:
            </h3>
            <p className="text-xl text-black">{totalSurvivors}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-black">
              Total Inventories:
            </h3>
            <p className="text-xl text-black">{totalInventoryItems}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultPage;

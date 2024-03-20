// pages/inventories.js
"use client";
import React from "react";

import { useSurvivorContext } from "@/contexts/SurvivorContext";

interface ItemTotals {
  [itemId: string]: number;
}

const InventoriesPage = () => {
  const { survivors, requestItemFromSurvivor, addItemFromSurvivor } =
    useSurvivorContext();

  // Calculate total quantity of each item
  const itemTotals = survivors.reduce((acc, survivor) => {
    survivor.inventory.forEach((item) => {
      acc[item.itemId] = (acc[item.itemId] || 0) + item.quantity;
    });
    return acc;
  }, {} as ItemTotals);

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Inventories</h2>
      {survivors.map((survivor) => (
        <div key={survivor.id} className="mb-4">
          <h3 className="text-xl font-bold">
            {survivor.name}&apos;s Inventory
          </h3>
          <ul className="ml-4">
            {survivor.inventory.map((item) => (
              <li
                key={item.itemId}
                className="text-sm mb-2 text-gray-500 flex items-center justify-between"
              >
                <span data-testid={`info-${survivor.id}-${item.itemId}`}>
                  {item.quantity} x {item.itemId}
                </span>
                <div>
                  <button
                    data-testid={`add-${survivor.id}-${item.itemId}`}
                    onClick={() =>
                      addItemFromSurvivor(survivor.id, item.itemId)
                    }
                    className="mr-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Add Item
                  </button>
                  <button
                    data-testid={`req-${survivor.id}-${item.itemId}`}
                    onClick={() =>
                      requestItemFromSurvivor(survivor.id, item.itemId)
                    }
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Request Item
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="mt-4">
        <h3 className="text-xl font-bold">Total Quantities</h3>
        <ul className="ml-4">
          {Object.entries(itemTotals).map(([itemId, total]) => (
            <li key={itemId} className="text-sm text-gray-500">
              {total} x {itemId}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InventoriesPage;

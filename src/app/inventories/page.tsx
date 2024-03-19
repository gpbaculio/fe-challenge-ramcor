// pages/inventories.js
"use client";
import { useSurvivorContext } from "@/contexts/SurvivorContext";
import React from "react";

const InventoriesPage = () => {
  const { survivors, requestItemFromSurvivor } = useSurvivorContext();

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
                <span>
                  {item.quantity} x {item.itemId}
                </span>
                {/* Request item button */}
                <button
                  onClick={() => {
                    requestItemFromSurvivor(survivor.id, item.itemId);
                  }}
                  className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Request
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default InventoriesPage;

"use client";
import { useSurvivorContext } from "@/contexts/SurvivorContext";
import React from "react";

const SurvivorList = () => {
  const { survivors } = useSurvivorContext();

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Survivors List</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {survivors.map((survivor) => (
            <li key={survivor.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="text-xl font-medium text-gray-900">
                    {survivor.name}
                  </div>
                  <div className="text-lg font-medium text-gray-500">
                    {survivor.age} years old
                  </div>
                </div>
                <div className="mt-2 flex items-center">
                  <div className="text-md font-medium text-gray-900">
                    Gender
                  </div>
                  <div className="ml-2 text-sm text-gray-500">
                    {survivor.gender}
                  </div>
                </div>
                {/* Render survivor's inventory */}
                <div className="mt-2">
                  <h3 className="text-lg font-medium text-gray-900">
                    Inventory
                  </h3>
                  <ul className="ml-4">
                    {survivor.inventory.map((item) => (
                      <li key={item.itemId} className="text-sm text-gray-500">
                        {item.quantity} x {item.itemId}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SurvivorList;

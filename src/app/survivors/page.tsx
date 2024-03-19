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
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <div className="ml-2 text-sm text-gray-500">
                    {survivor.gender}
                  </div>
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

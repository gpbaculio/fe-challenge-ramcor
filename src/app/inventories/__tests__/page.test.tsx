import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import InventoriesPage from "../page"; // Adjust the path as per your project structure
import { SurvivorProvider } from "@/contexts/SurvivorContext";

describe("InventoriesPage", () => {
  test("Add Item button calls addItemFromSurvivor", async () => {
    const { getByTestId, findByTestId } = render(
      <SurvivorProvider>
        <InventoriesPage />
      </SurvivorProvider>
    );
    const addItemButton = getByTestId(`add-1-water`);

    const itemInfo = await findByTestId("info-1-water");
    expect(itemInfo.textContent).toBe("5 x water");
    // increase
    fireEvent.click(addItemButton);
    expect(itemInfo.textContent).toBe("6 x water");
  });

  test("Request button calls requestItemFromSurvivor", async () => {
    const { findByText, getByTestId, findByTestId } = render(
      <SurvivorProvider>
        <InventoriesPage />
      </SurvivorProvider>
    );
    const requestButton = getByTestId(`req-1-water`);
    const itemInfo = await findByTestId("info-1-water");
    expect(itemInfo.textContent).toBe("6 x water");
    // decrease
    fireEvent.click(requestButton);
    expect(itemInfo.textContent).toBe("5 x water");
  });
});

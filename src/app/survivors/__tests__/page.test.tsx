import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import SurvivorList from "../page";
import { SurvivorProvider } from "@/contexts/SurvivorContext";

describe("SurvivorList component", () => {
  it("renders correctly", () => {
    const { getByText, getAllByText } = render(
      <SurvivorProvider>
        <SurvivorList />
      </SurvivorProvider>
    );
    // Check if survivor names are rendered
    expect(getByText("Bob Brown")).toBeInTheDocument();
    expect(getByText("45 years old")).toBeInTheDocument();
    expect(getAllByText("male").length).toBeGreaterThan(1);
  });
});

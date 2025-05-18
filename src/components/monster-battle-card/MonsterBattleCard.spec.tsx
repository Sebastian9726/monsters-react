import React, { ReactElement } from "react";
import "@testing-library/jest-dom";
import { render, screen, RenderResult } from "@testing-library/react";
import { MonsterBattleCard } from "./MonsterBattleCard.extended";
import { act } from "react";
import { Monster } from "../../models/interfaces/monster.interface";

// Helper function that wraps render with act
const renderWithAct = async (component: ReactElement): Promise<RenderResult> => {
  let renderResult: RenderResult | undefined;
  
  await act(async () => {
    renderResult = render(component);
  });
  
  // TypeScript now knows this can't be undefined after the await
  return renderResult!;
};

describe("MonsterBattleCard", () => {
  const mockMonster: Monster = {
    id: "monster-1",
    name: "Test Monster",
    attack: 50,
    defense: 40,
    hp: 80,
    speed: 70,
    type: "fire",
    imageUrl: "https://example.com/monster.png",
  };

  it("renders an empty card when no monster is provided", async () => {
    await renderWithAct(<MonsterBattleCard title="No Monster" />);

    // En la implementación actual, el título no se muestra cuando no hay monstruo
    // Verificamos que el componente renderiza pero sin mostrar el título
    expect(screen.queryByText("No Monster")).not.toBeInTheDocument();
  });

  it("renders the card with title when a monster is provided", async () => {
    await renderWithAct(<MonsterBattleCard monster={mockMonster} title="Monster Card" />);

    // Ahora sí debería mostrar el título
    expect(screen.getByText("Monster Card")).toBeInTheDocument();
  });
});
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MonsterBattleCard } from "./MonsterBattleCard.extended";
import { Monster } from "../../models/interfaces/monster.interface";

describe("MonsterBattleCardExtended", () => {
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

  it("renders the monster card correctly with a monster", () => {
    render(<MonsterBattleCard monster={mockMonster} title="Player Monster" />);
    
    // Verify title is rendered
    expect(screen.getByText("Player Monster")).toBeInTheDocument();
    
    // Verify monster image is rendered
    const monsterImage = screen.getByAltText("Test Monster");
    expect(monsterImage).toBeInTheDocument();
    expect(monsterImage).toHaveAttribute("src", "https://example.com/monster.png");
    
    // Verify stats are displayed
    expect(screen.getByText("HP")).toBeInTheDocument();
    expect(screen.getByText("Attack")).toBeInTheDocument();
    expect(screen.getByText("Defense")).toBeInTheDocument();
    expect(screen.getByText("Speed")).toBeInTheDocument();
  });

  it("renders an empty card when no monster is provided", () => {
    render(<MonsterBattleCard title="Empty Card" />);
    
    // Card should be rendered but without monster details
    expect(screen.queryByText("HP")).not.toBeInTheDocument();
    expect(screen.queryByText("Attack")).not.toBeInTheDocument();
    
    // Title should not be visible when no monster
    expect(screen.queryByText("Empty Card")).not.toBeInTheDocument();
  });

  it("handles null monster value correctly", () => {
    render(<MonsterBattleCard monster={null} title="Null Monster" />);
    
    // Card should be rendered but without monster details
    expect(screen.queryByText("HP")).not.toBeInTheDocument();
    expect(screen.queryByText("Attack")).not.toBeInTheDocument();
    
    // Title should not be visible when monster is null
    expect(screen.queryByText("Null Monster")).not.toBeInTheDocument();
  });
});

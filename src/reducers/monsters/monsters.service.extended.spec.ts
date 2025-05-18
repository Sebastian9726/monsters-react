import { MonsterServiceExtended } from "./monsters.service.extended";
import { API_URL } from "../../constants/env";
import { Monster } from "../../models/interfaces/monster.interface";
import { Battle } from "../../models/interfaces/battle.interface";

describe("Monsters Service Extended", () => {
  const mockPlayerMonster: Monster = {
    id: "player-monster-1",
    name: "Player Monster",
    attack: 60,
    defense: 40,
    hp: 80,
    speed: 50,
    type: "water",
    imageUrl: "player-monster.png",
  };

  const mockComputerMonster: Monster = {
    id: "computer-monster-1",
    name: "Computer Monster",
    attack: 50,
    defense: 50,
    hp: 70,
    speed: 60,
    type: "fire",
    imageUrl: "computer-monster.png",
  };

  const mockBattleResponse: Battle = {
    winner: mockPlayerMonster,
    tie: false,
  };

  beforeEach(() => {
    // Reset the fetch mock before each test
    global.fetch = jest.fn();
  });

  it("should get the winner of the battle of monsters", async () => {
    // Mock the fetch response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockBattleResponse),
    });

    // Call the battle method
    const result = await MonsterServiceExtended.battle(
      mockPlayerMonster,
      mockComputerMonster
    );

    // Verify fetch was called with the correct parameters
    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/battle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        monster1Id: mockPlayerMonster.id,
        monster2Id: mockComputerMonster.id,
      }),
    });

    // Verify the result
    expect(result).toEqual(mockBattleResponse);
    expect(result.winner).toEqual(mockPlayerMonster);
    expect(result.tie).toBeFalsy();
  });

  it("should handle errors when the battle API call fails", async () => {
    // Mock the fetch response to simulate an error
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    // Verify that an error is thrown
    await expect(
      MonsterServiceExtended.battle(mockPlayerMonster, mockComputerMonster)
    ).rejects.toThrow("Failed to create battle");
  });

  it("should handle null computer monster", async () => {
    // Mock the fetch response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockBattleResponse),
    });

    // Call the battle method with null computer monster
    await MonsterServiceExtended.battle(mockPlayerMonster, null);

    // When computerMonster is null, computerMonster?.id will be undefined
    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/battle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        monster1Id: mockPlayerMonster.id,
        monster2Id: undefined,
      }),
    });
  });
});

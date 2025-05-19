import { monstersReducerExtended } from "./monsters.reducer.extended";
import {
  setRandomMonster,
  setSelectedMonster,
  setWinner,
  fetchBattleWins,
} from "./monsters.actions.extended";
import { Monster } from "../../models/interfaces/monster.interface";
import { Battle } from "../../models/interfaces/battle.interface";

describe("monstersReducerExtended", () => {
  const initialState = {
    selectRandomMonster: null,
    winner: null,
  };

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

  const mockBattle: Battle = {
    winner: mockMonster,
    tie: false,
  };

  it("should handle initial state", () => {
    expect(monstersReducerExtended(undefined, { type: "unknown" })).toEqual({
      selectRandomMonster: null,
      winner: null,
    });
  });

  it("should handle setRandomMonster action", () => {
    const actualState = monstersReducerExtended(
      initialState,
      setRandomMonster(mockMonster),
    );

    expect(actualState).toEqual({
      selectRandomMonster: mockMonster,
      winner: null,
    });
  });

  it("should handle setSelectedMonster action", () => {
    // Establecer un estado inicial con un ganador
    const stateWithWinner = {
      ...initialState,
      winner: mockBattle,
    };

    // La acción setSelectedMonster debería limpiar el ganador
    const actualState = monstersReducerExtended(
      stateWithWinner,
      setSelectedMonster(mockMonster),
    );

    expect(actualState).toEqual({
      selectRandomMonster: null, // No cambia
      winner: null, // Se resetea
    });
  });

  it("should handle setWinner action", () => {
    // La acción setWinner no modifica el estado actualmente
    const actualState = monstersReducerExtended(
      initialState,
      setWinner(mockMonster),
    );

    // Debería devolver el mismo estado sin cambios
    expect(actualState).toEqual(initialState);
  });

  it("should handle fetchBattleWins.pending action", () => {
    // Establecer un estado inicial con un ganador
    const stateWithWinner = {
      ...initialState,
      winner: mockBattle,
    };

    // La acción pending debería limpiar el ganador
    const actualState = monstersReducerExtended(
      stateWithWinner,
      fetchBattleWins.pending("", {
        playerMonster: mockMonster,
        selectedRandomMonster: mockMonster,
      }),
    );

    expect(actualState).toEqual({
      selectRandomMonster: null,
      winner: null,
    });
  });

  it("should handle fetchBattleWins.fulfilled action", () => {
    // La acción fulfilled debería establecer el ganador de la batalla
    const actualState = monstersReducerExtended(
      initialState,
      fetchBattleWins.fulfilled(mockBattle, "", {
        playerMonster: mockMonster,
        selectedRandomMonster: mockMonster,
      }),
    );

    expect(actualState).toEqual({
      selectRandomMonster: null,
      winner: mockBattle,
    });
  });

  it("should handle fetchBattleWins.rejected action", () => {
    // Establecer un estado inicial con un ganador
    const stateWithWinner = {
      ...initialState,
      winner: mockBattle,
    };

    // Mock de una acción rejected 
    const action = {
      type: fetchBattleWins.rejected.type,
      error: { message: 'Error' },
      meta: {
        arg: { playerMonster: mockMonster, selectedRandomMonster: mockMonster },
        requestId: "testRequestId",
        rejectedWithValue: false
        }
    };

    // La acción rejected debería limpiar el ganador
    const actualState = monstersReducerExtended(stateWithWinner, action);

    expect(actualState).toEqual({
      selectRandomMonster: null,
      winner: null,
    });
  });
});

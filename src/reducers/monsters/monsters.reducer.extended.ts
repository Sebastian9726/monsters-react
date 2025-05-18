import { createReducer } from "@reduxjs/toolkit";
import { Battle } from "../../models/interfaces/battle.interface";
import { Monster } from "../../models/interfaces/monster.interface";
import {
  setRandomMonster,
  setWinner,
  fetchBattleWins,
  setSelectedMonster,
} from "./monsters.actions.extended";

interface MonsterState {
  selectRandomMonster: Monster | null;
  winner: Battle | null;
}

const initialState: MonsterState = {
  selectRandomMonster: null,
  winner: null,
};

export const monstersReducerExtended = createReducer(
  initialState,
  (builder) => {
    builder.addCase(setRandomMonster, (state, action) => ({
      ...state,
      selectRandomMonster: action.payload,
      winner: null,
    }));

    builder.addCase(setSelectedMonster, (state) => ({
      ...state,
      winner: null,
    }));

    builder.addCase(setWinner, (state) => ({
      ...state,
    }));

    // Manejo de la batalla
    builder.addCase(fetchBattleWins.pending, (state) => ({
      ...state,
      winner: null,
    }));

    builder.addCase(fetchBattleWins.fulfilled, (state, action) => ({
      ...state,
      winner: action.payload,
    }));

    builder.addCase(fetchBattleWins.rejected, (state) => ({
      ...state,
      winner: null,
    }));
  },
);

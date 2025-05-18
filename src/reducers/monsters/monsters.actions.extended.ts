import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Monster } from "../../models/interfaces/monster.interface";
import { MonsterService } from "./monsters.service";
import { MonsterServiceExtended } from "./monsters.service.extended";
import { Battle } from "../../models/interfaces/battle.interface";

// Agregamos la acción para cargar los monstruos
export const fetchMonstersData = createAsyncThunk<Monster[]>(
  "monsters/fetchMonstersData",
  MonsterService.getAll,
);

export const fetchBattleWins = createAsyncThunk<
  Battle,
  { playerMonster: Monster; selectedRandomMonster: Monster | null }
>(
  "monsters/fetchBattleWins",
  async ({ playerMonster, selectedRandomMonster }) => {
    return MonsterServiceExtended.battle(playerMonster, selectedRandomMonster);
  },
);

export const setRandomMonster = createAction<Monster | null>(
  "monsters/setRandomMonster",
);

export const setWinner = createAction<Monster | null>("monsters/setWinner");

export const setSelectedMonster = createAction<Monster | null>(
  "monsters/setSelectedMonster",
);

export const selectedRandomMonster = createAction<Monster | null>(
  "monsters/selectedRandomMonster",
);

export const createBattle = fetchBattleWins;

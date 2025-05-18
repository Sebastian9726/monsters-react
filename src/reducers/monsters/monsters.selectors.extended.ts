import { RootState } from "../../app/store";

export const monsterWins = (state: RootState) => state.monstersExtended.winner;
export const selectRandomMonster = (state: RootState) =>
  state.monstersExtended.selectRandomMonster;
export const randomMonsters = (state: RootState) => state.monsters.monsters;

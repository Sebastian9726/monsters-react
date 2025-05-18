import { API_URL } from "../../constants/env";
import { Battle } from "../../models/interfaces/battle.interface";
import { Monster } from "../../models/interfaces/monster.interface";

const battle = async (
  playerMonster: Monster,
  computerMonster?: Monster | null,
): Promise<Battle> => {
  const response = await fetch(`${API_URL}/battle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      monster1Id: playerMonster.id,
      monster2Id: computerMonster?.id, // Send the computerMonster id if provided
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create battle");
  }

  return response.json();
};

export const MonsterServiceExtended = {
  battle,
};

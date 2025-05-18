import React, { useState, useEffect, useCallback } from "react";
import { useAppDispatch } from "../../app/hooks";
import { Monster } from "../../models/interfaces/monster.interface";
import { setSelectedMonster } from "../../reducers/monsters/monsters.actions";
import {
  Image,
  ListTitle,
  MonsterCard,
  MonsterName,
  MonstersSection,
} from "./MonstersList.styled";
import { setRandomMonster } from "../../reducers/monsters/monsters.actions.extended";

type MonstersListProps = {
  monsters: Monster[];
};

const MonstersList: React.FC<MonstersListProps> = ({ monsters }) => {
  const dispatch = useAppDispatch();

  const [selectedMonsterId, setSelectedMonsterId] = useState<string | null>(
    null,
  );
  const [randomMonsterId, setRandomMonsterId] = useState<string | null>(null);

  const selectRandomComputerMonster = useCallback(
    (playerMonsterId: string | null) => {
      if (!playerMonsterId || monsters.length <= 1) {
        setRandomMonsterId(null);
        dispatch(setRandomMonster(null));
        return;
      }
      const availableMonsters = monsters.filter(
        (monster) => monster.id !== playerMonsterId,
      );

      if (availableMonsters.length === 0) {
        setRandomMonsterId(null);
        dispatch(setRandomMonster(null));
        return;
      }

      const randomIndex = Math.floor(Math.random() * availableMonsters.length);
      const randomMonster = availableMonsters[randomIndex];

      setRandomMonsterId(randomMonster.id);
      dispatch(setRandomMonster(randomMonster));
    },
    [monsters, dispatch],
  );

  useEffect(() => {
    if (selectedMonsterId) {
      selectRandomComputerMonster(selectedMonsterId);
    } else {
      setRandomMonsterId(null);
      dispatch(setRandomMonster(null));
    }
  }, [selectedMonsterId, dispatch, selectRandomComputerMonster]);

  const handleMonsterClick = (monster: Monster) => {
    const value = selectedMonsterId === monster.id ? null : monster.id;
    setSelectedMonsterId(value);
    dispatch(setSelectedMonster(!value ? null : monster));
  };

  return (
    <div>
      <ListTitle>
        {monsters.length > 0 ? "Select your monster" : "No monsters available"}
      </ListTitle>

      <MonstersSection data-testid="monsters-list-section">
        {monsters.map((monster) => (
          <MonsterCard
            key={monster.id}
            onClick={() => handleMonsterClick(monster)}
            selected={monster.id === selectedMonsterId}
            data-testid={monster.id}
          >
            <Image src={monster.imageUrl} />
            <MonsterName>{monster.name}</MonsterName>
          </MonsterCard>
        ))}
      </MonstersSection>
    </div>
  );
};

export { MonstersList };

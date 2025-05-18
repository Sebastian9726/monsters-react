import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { MonsterBattleCard } from "../../components/monster-battle-card/MonsterBattleCard.extended";
import { MonstersList } from "../../components/monsters-list/MonstersList.extended";
import { Title } from "../../components/title/Title";
import {
  fetchMonstersData,
  createBattle,
} from "../../reducers/monsters/monsters.actions.extended";
import {
  randomMonsters,
  selectRandomMonster,
  monsterWins,
} from "../../reducers/monsters/monsters.selectors.extended";
import {
  BattleSection,
  PageContainer,
  StartBattleButton,
} from "./BattleOfMonsters.extended.styled";
import { selectSelectedMonster } from "../../reducers/monsters/monsters.selectors";
import { WinnerDisplay } from "../../components/winner-display/WinnerDisplay";

const BattleOfMonsters = () => {
  const dispatch = useAppDispatch();

  const winner = useSelector(monsterWins);

  // Utilizamos los selectores para obtener los datos del estado
  const monsters = useSelector(randomMonsters);
  const selectedMonster = useSelector(selectSelectedMonster);
  const randomComputerMonster = useSelector(selectRandomMonster);

  useEffect(() => {
    dispatch(fetchMonstersData());
  }, [dispatch]);

  const handleStartBattleClick = () => {
    if (selectedMonster && randomComputerMonster) {
      // Iniciamos la batalla con el monstruo del jugador y el monstruo aleatorio
      dispatch(
        createBattle({
          playerMonster: selectedMonster,
          selectedRandomMonster: randomComputerMonster,
        }),
      );
    }
  };

  return (
    <PageContainer>
      <Title>Battle of Monsters</Title>

      <MonstersList monsters={monsters} />

      {winner && <WinnerDisplay text={winner.winner.name} />}

      <BattleSection>
        <MonsterBattleCard
          monster={selectedMonster}
          title={selectedMonster?.name || "Player"}
        />
        <StartBattleButton
          data-testid="start-battle-button"
          disabled={selectedMonster === null}
          onClick={handleStartBattleClick}
        >
          Start Battle
        </StartBattleButton>
        <MonsterBattleCard
          monster={randomComputerMonster}
          title={randomComputerMonster?.name || "Computer"}
        />
      </BattleSection>
    </PageContainer>
  );
};

export { BattleOfMonsters };

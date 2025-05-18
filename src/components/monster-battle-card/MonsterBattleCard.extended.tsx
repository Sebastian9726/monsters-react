import React from "react";
import { Monster } from "../../models/interfaces/monster.interface";
import {
  BattleMonsterCard,
  BattleMonsterTitle,
  ProgressBar,
} from "./MonsterBattleCard.extended.styled";
import { Box, Typography } from "@mui/material";

type MonsterCardProps = {
  monster?: Monster | null;
  title?: string;
};

const MonsterBattleCard: React.FC<MonsterCardProps> = ({
  monster,
  title = "",
}) => {
  return (
    <BattleMonsterCard centralized={!monster}>
      {monster && (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "180px",
              display: "flex",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <img
              src={monster.imageUrl}
              alt={monster.name}
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                objectFit: "contain",
                borderRadius: "7px",
              }}
            />
          </Box>

          <Box sx={{ alignSelf: "flex-start" }}>
            <BattleMonsterTitle>{title}</BattleMonsterTitle>
          </Box>

          <Box
            sx={{
              width: "100%",
              height: "1px",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              mt: 0.63,
              mb: 1.37,
              boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
            }}
          />

          <Box sx={{ width: "100%", mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: "bold", mb: 0.5 }}>
              HP
            </Typography>
            <ProgressBar
              variant="determinate"
              value={(monster.hp / 100) * 100}
            />
          </Box>

          <Box sx={{ width: "100%", mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: "bold", mb: 0.5 }}>
              Attack
            </Typography>
            <ProgressBar
              variant="determinate"
              value={(monster.attack / 100) * 100}
            />
          </Box>

          <Box sx={{ width: "100%", mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: "bold", mb: 0.5 }}>
              Defense
            </Typography>
            <ProgressBar
              variant="determinate"
              value={(monster.defense / 100) * 100}
            />
          </Box>

          <Box sx={{ width: "100%", mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: "bold", mb: 0.5 }}>
              Speed
            </Typography>
            <ProgressBar
              variant="determinate"
              value={(monster.speed / 100) * 100}
            />
          </Box>
        </Box>
      )}
    </BattleMonsterCard>
  );
};

export { MonsterBattleCard };

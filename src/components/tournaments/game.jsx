import React, { useState, useEffect } from "react";
import {
  Bracket,
  SeedItem,
  SeedTeam,
  SingleLineSeed,
  Seed,
} from "@sportsgram/brackets";

// Dữ liệu cứng để test
const testData = [
  {
    gameId: 1,
    contestId: 1,
    playingDate: "2024-07-15",
    firstPlayerId: 101,
    secondPlayerId: 102,
    scoreFirstPlayer: 3,
    scoreSecondPlayer: 2,
    gameNumber: 1,
    round: 1,
  },
  {
    gameId: 2,
    contestId: 1,
    playingDate: "2024-07-15",
    firstPlayerId: 103,
    secondPlayerId: 104,
    scoreFirstPlayer: 1,
    scoreSecondPlayer: 3,
    gameNumber: 2,
    round: 1,
  },
  {
    gameId: 3,
    contestId: 1,
    playingDate: "2024-07-16",
    firstPlayerId: 105,
    secondPlayerId: 106,
    scoreFirstPlayer: 2,
    scoreSecondPlayer: 3,
    gameNumber: 3,
    round: 1,
  },
  {
    gameId: 4,
    contestId: 1,
    playingDate: "2024-07-16",
    firstPlayerId: 107,
    secondPlayerId: 108,
    scoreFirstPlayer: 3,
    scoreSecondPlayer: 1,
    gameNumber: 4,
    round: 1,
  },
];

const generateRounds = (data, totalMatches) => {
  const rounds = [];
  const roundData = {};

  data.forEach((game) => {
    const {
      round,
      gameId,
      firstPlayerId,
      secondPlayerId,
      scoreFirstPlayer,
      scoreSecondPlayer,
    } = game;

    if (!roundData[round]) {
      roundData[round] = [];
    }

    roundData[round].push({
      id: gameId,
      teams: [
        {
          id: firstPlayerId,
          name: `Player ${firstPlayerId}`,
          score: scoreFirstPlayer,
        },
        {
          id: secondPlayerId,
          name: `Player ${secondPlayerId}`,
          score: scoreSecondPlayer,
        },
      ],
    });
  });

  const totalRounds = Math.ceil(Math.log2(totalMatches + 1));

  for (let i = 1; i <= totalRounds; i++) {
    const matchesInRound = totalMatches / Math.pow(2, i - 1);

    const roundSeeds = [];

    for (let j = 0; j < matchesInRound; j++) {
      if (roundData[i] && roundData[i][j]) {
        roundSeeds.push(roundData[i][j]);
      } else {
        roundSeeds.push({
          id: null,
          teams: [
            { id: null, name: "?", score: null },
            { id: null, name: "?", score: null },
          ],
        });
      }
    }

    rounds.push({ seeds: roundSeeds });
  }

  return rounds;
};

const totalMatches = 15;
const initialRounds = generateRounds(testData, totalMatches);

// Custom Seed component
const CustomSeed = ({
  seed,
  breakpoint,
  roundIndex,
  seedIndex,
  isMiddleOfTwoSided,
}) => {
  const Wrapper = isMiddleOfTwoSided ? SingleLineSeed : Seed;
  return (
    <Wrapper mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
      <SeedItem>
        <div>
          <SeedTeam style={{ color: "red" }}>
            {seed.teams[0]?.name || "NO TEAM"}
          </SeedTeam>
          <SeedTeam>{seed.teams[1]?.name || "NO TEAM"}</SeedTeam>
        </div>
      </SeedItem>
    </Wrapper>
  );
};

const Game = () => {
  const [rounds, setRounds] = useState(initialRounds);
  const [totalRounds, setTotalRounds] = useState(
    Math.ceil(Math.log2(totalMatches + 1))
  );

  useEffect(() => {
    const updatedRounds = generateRounds(testData, totalMatches);
    setRounds(updatedRounds);
    setTotalRounds(Math.ceil(Math.log2(totalMatches + 1)));
  }, [totalMatches]);

  const renderRoundTitle = (roundIndex) => {
    if (roundIndex === totalRounds - 1) {
      return "Final";
    } else if (roundIndex === totalRounds - 2) {
      return "Semi-final";
    } else {
      return `Round ${roundIndex + 1}`;
    }
  };

  return (
    <Bracket
      rounds={rounds.map((round, index) => ({
        ...round,
        title: renderRoundTitle(index),
      }))}
      renderSeedComponent={CustomSeed}
      twoSided={true}
    />
  );
};

export default Game;

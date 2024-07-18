import React, { useState, useEffect } from "react";
import {
  Bracket,
  SeedItem,
  SeedTeam,
  SingleLineSeed,
  Seed,
} from "@sportsgram/brackets";

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
const testTime = [
  {
    gameId: 1,
    playingTime: "2024-07-15 10:00 AM",
  },
  {
    gameId: 2,
    playingTime: "2024-07-15 12:00 PM",
  },
  {
    gameId: 3,
    playingTime: "2024-07-16 02:00 PM",
  },
  {
    gameId: 4,
    playingTime: "2024-07-16 04:00 PM",
  },
];

const testScore = [
  {
    scoreId: 1,
    gameId: 1,
    setNumber: "FIRSTSET",
    firstPlayerSetScore: 3,
    secondPlayerSetScore: 2,
  },
  {
    scoreId: 2,
    gameId: 2,
    setNumber: "FIRSTSET",
    firstPlayerSetScore: 1,
    secondPlayerSetScore: 3,
  },
  {
    scoreId: 3,
    gameId: 3,
    setNumber: "FIRSTSET",
    firstPlayerSetScore: 2,
    secondPlayerSetScore: 3,
  },
  {
    scoreId: 4,
    gameId: 4,
    setNumber: "FIRSTSET",
    firstPlayerSetScore: 3,
    secondPlayerSetScore: 1,
  },
];

const generateRounds = (data, timeData, scoreData, totalMatches) => {
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

    const playingTime =
      timeData.find((time) => time.gameId === gameId)?.playingTime || "Unknown";
    const setScore = scoreData.find((score) => score.gameId === gameId);

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
          setScore: setScore?.firstPlayerSetScore || 0,
        },
        {
          id: secondPlayerId,
          name: `Player ${secondPlayerId}`,
          score: scoreSecondPlayer,
          setScore: setScore?.secondPlayerSetScore || 0,
        },
      ],
      playingTime,
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
            { id: null, name: "?", score: null, setScore: null },
            { id: null, name: "?", score: null, setScore: null },
          ],
          playingTime: "Unknown",
        });
      }
    }

    rounds.push({ seeds: roundSeeds });
  }

  return rounds;
};

const GamebyCustomer = () => {
  const totalMatches = 15;
  const initialRounds = generateRounds(
    testData,
    testTime,
    testScore,
    totalMatches
  );
  const [rounds, setRounds] = useState(initialRounds);
  const [totalRounds, setTotalRounds] = useState(
    Math.ceil(Math.log2(totalMatches + 1))
  );

  useEffect(() => {
    const updatedRounds = generateRounds(
      testData,
      testTime,
      testScore,
      totalMatches
    );
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
  const CustomSeed = ({
    seed,
    breakpoint,
    roundIndex,
    seedIndex,
    isMiddleOfTwoSided,
  }) => {
    const Wrapper = isMiddleOfTwoSided ? SingleLineSeed : Seed;

    const getScoreBackgroundColor = (teamScore, opponentScore) => {
      return teamScore > opponentScore ? "#ffeb3b" : "#ffffff";
    };

    return (
      <Wrapper mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
        <SeedItem>
          <div style={{ textAlign: "center", marginBottom: "8px" }}>
            {seed.playingTime}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <SeedTeam style={{ color: "white" }}>
                {seed.teams[0]?.name || "NO TEAM"}
              </SeedTeam>
              <span
                style={{
                  backgroundColor: getScoreBackgroundColor(
                    seed.teams[0]?.score,
                    seed.teams[1]?.score
                  ),
                  marginLeft: "8px",
                  padding: "2px 6px",
                  borderRadius: "4px",
                }}
              >
                {seed.teams[0]?.score}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <SeedTeam>{seed.teams[1]?.name || "NO TEAM"}</SeedTeam>
              <span
                style={{
                  backgroundColor: getScoreBackgroundColor(
                    seed.teams[1]?.score,
                    seed.teams[0]?.score
                  ),
                  marginLeft: "8px",
                  padding: "2px 6px",
                  borderRadius: "4px",
                }}
              >
                {seed.teams[1]?.score}
              </span>
            </div>
          </div>
        </SeedItem>
      </Wrapper>
    );
  };

  return (
    <>
      <Bracket
        rounds={rounds.map((round, index) => ({
          ...round,
          title: renderRoundTitle(index),
        }))}
        renderSeedComponent={CustomSeed}
        twoSided={true}
      />
    </>
  );
};

export default GamebyCustomer;

import React, { useState, useEffect } from "react";
import {
  Bracket,
  SeedItem,
  SeedTeam,
  SingleLineSeed,
  Seed,
} from "@sportsgram/brackets";

import api from "../../config/axios";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

const fetchGames = async (contestId) => {
  const response = await api.get(`/contest/games/${contestId}`);
  return response.data;
};

const fetchPlayingTime = async (gameId) => {
  const response = await api.get(`/contest/game/${gameId}`);
  return response.data.playingDate;
};

const fetchScores = async (gameId) => {
  const response = await api.get(`/score/${gameId}`);
  return response.data;
};

const fetchContestDetails = async (contestId) => {
  const response = await api.get(`/contest/${contestId}`);
  return response.data;
};

const generateRounds = (data, timeData, scoreData, totalMatches) => {
  const rounds = [];
  const roundData = {};

  data.forEach((game, index) => {
    const {
      round,
      gameId,
      firstPlayerId,
      secondPlayerId,
      scoreFirstPlayer,
      scoreSecondPlayer,
    } = game;

    const playingDate = timeData[index] || "Unknown";
    const setScore = scoreData[index];

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
      playingDate,
    });
  });

  // Tổng số vòng đấu
  const totalRounds = Math.ceil(Math.log2(totalMatches + 1));

  // Số trận đấu tối đa trong vòng đầu tiên
  const initialMatches = Math.ceil(totalMatches / 2);

  for (let i = 1; i <= totalRounds; i++) {
    // Số trận đấu trong vòng hiện tại
    const matchesInRound = Math.ceil(initialMatches / Math.pow(2, i - 1));
    const roundSeeds = [];

    for (let j = 0; j < matchesInRound; j++) {
      if (roundData[i] && roundData[i][j]) {
        roundSeeds.push(roundData[i][j]);
      } else {
        roundSeeds.push({
          id: null,
          teams: [
            { id: null, name: "Winner", score: null, setScore: null },
            { id: null, name: "Winner", score: null, setScore: null },
          ],
          playingDate: "Unknown",
        });
      }
    }

    rounds.push({ seeds: roundSeeds });
  }

  return rounds;
};

const GamebyCustomer = () => {
  const [rounds, setRounds] = useState([]);
  const [totalRounds, setTotalRounds] = useState(0);
  const { id: contestId } = useParams();

  useEffect(() => {
    const loadData = async () => {
      const [contestDetails, games] = await Promise.all([
        fetchContestDetails(contestId),
        fetchGames(contestId),
      ]);

      const totalMatches = contestDetails.capacity - 1;

      const timePromises = games.map((game) => fetchPlayingTime(game.gameId));
      const scorePromises = games.map((game) => fetchScores(game.gameId));

      const playingDates = await Promise.all(timePromises);
      const scores = await Promise.all(scorePromises);

      const updatedRounds = generateRounds(
        games,
        playingDates,
        scores,
        totalMatches
      );
      setRounds(updatedRounds);
      setTotalRounds(Math.ceil(Math.log2(totalMatches + 1)));
    };

    loadData();
  }, [contestId]);

  const renderRoundTitle = (roundIndex) => {
    const titleStyle = {
      backgroundColor: "#3C6259",
      color: "#fff",
      padding: "10px",
      borderRadius: "5px",
      marginLeft: "10px",
      textAlign: "center",
    };

    if (roundIndex === totalRounds - 1) {
      return <Box style={titleStyle}>Final</Box>;
    } else if (roundIndex === totalRounds - 2) {
      return <Box style={titleStyle}>Semi-final</Box>;
    } else {
      return <Box style={titleStyle}>Round {roundIndex + 1}</Box>;
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
            {seed.playingDate}
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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      // minHeight="100vh"
      p={2}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        maxWidth="1200px"
      >
        <Bracket
          rounds={rounds.map((round, index) => ({
            ...round,
            title: renderRoundTitle(index),
          }))}
          renderSeedComponent={CustomSeed}
          twoSided={false}
        />
      </Box>
    </Box>
  );
};

export default GamebyCustomer;

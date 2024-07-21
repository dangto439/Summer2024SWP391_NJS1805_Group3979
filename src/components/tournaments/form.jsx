import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import api from "../../config/axios";

const Form = ({ isOpen, onClose, onSubmit, mode, seedId, getTeamNames }) => {
  const [scores1, setScores1] = useState([0, 0, 0]);
  const [scores2, setScores2] = useState([0, 0, 0]);
  const [winner, setWinner] = useState(null);
  const [playingDate, setPlayingDate] = useState("");
  const [courtSlotId, setCourtSlotId] = useState("");
  const [courtId, setCourtId] = useState("");
  const [courtOptions, setCourtOptions] = useState([]);
  const [courtSlotOptions, setCourtSlotOptions] = useState([]);
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");

  useEffect(() => {
    if (seedId) {
      const [team1Name, team2Name] = getTeamNames(seedId);
      setTeam1(team1Name);
      setTeam2(team2Name);
      handleGetTime();
      handleGetScore();
      handleGetCourts();
    }
  }, [seedId, getTeamNames]);

  useEffect(() => {
    if (courtId) {
      handleGetCourtSlots(courtId);
    }
  }, [courtId]);

  const handleGetCourts = async () => {
    try {
      const response = await api.get(`/courts/${seedId}`);
      setCourtOptions(response.data || []);
    } catch (error) {
      console.error("Failed to get courts:", error);
    }
  };

  const handleGetCourtSlots = async (courtId) => {
    try {
      const response = await api.get(`/court-slot/${courtId}`);
      setCourtSlotOptions(response.data || []);
    } catch (error) {
      console.error("Failed to get court slots:", error);
    }
  };

  const handleScoreChange = (team, scoreIndex, value) => {
    if (team === 1) {
      const newScores1 = [...scores1];
      newScores1[scoreIndex] = parseInt(value) || 0;
      setScores1(newScores1);
      updateWinner(newScores1, scores2);
    } else if (team === 2) {
      const newScores2 = [...scores2];
      newScores2[scoreIndex] = parseInt(value) || 0;
      setScores2(newScores2);
      updateWinner(scores1, newScores2);
    }
  };

  const updateWinner = (scores1, scores2) => {
    let team1Wins = 0;
    let team2Wins = 0;

    for (let i = 0; i < 3; i++) {
      if (scores1[i] > scores2[i]) {
        team1Wins++;
      } else if (scores2[i] > scores1[i]) {
        team2Wins++;
      }
    }

    if (team1Wins > team2Wins) {
      setWinner(team1);
    } else if (team2Wins > team1Wins) {
      setWinner(team2);
    } else {
      setWinner("Tie");
    }
  };

  const handleSetTime = async () => {
    try {
      const timeData = {
        playingDate,
        courtSlotId,
      };
      await api.put(`/contest/game/${seedId}`, timeData);
      onSubmit();
    } catch (error) {
      console.error("Failed to set time:", error);
    }
  };

  const handleGetTime = async () => {
    try {
      const response = await api.get(`/contest/game/${seedId}`);
      setPlayingDate(response.data.playingDate || "");
      // setCourtSlotId(response.data.courtSlotId || "");
    } catch (error) {
      console.error("Failed to get time:", error);
    }
  };

  const handleSubmitScore = async () => {
    try {
      const scoreData1 = {
        gameId: seedId,
        firstPlayerSetScore: scores1,
        secondPlayerSetScore: scores2,
      };
      const scoreData2 = {
        firstPlayerSetScore: scores1,
        secondPlayerSetScore: scores2,
      };

      const response = await api.get(`/score/${seedId}`);
      if (response.data) {
        await api.put(`/score/${seedId}`, scoreData2);
      } else {
        await api.post(`/score`, scoreData1);
      }
      onSubmit();
    } catch (error) {
      console.error("Failed to submit score:", error);
    }
  };

  const handleGetScore = async () => {
    try {
      const response = await api.get(`/score/${seedId}`);
      if (response.data) {
        setScores1(response.data.firstPlayerSetScore || [0, 0, 0]);
        setScores2(response.data.secondPlayerSetScore || [0, 0, 0]);
      }
    } catch (error) {
      console.error("Failed to get score:", error);
    }
  };

  const handleSubmit = () => {
    if (mode === "Time") {
      handleSetTime();
    } else if (mode === "Score") {
      handleSubmitScore();
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 800,
        bgcolor: "whitesmoke",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Button onClick={onClose}>
          <CloseIcon />
        </Button>
      </Box>
      {mode === "Time" && (
        <>
          <Typography variant="h6" component="h2">
            Chi Tiết Trận
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid #000",
                p: 2,
                mx: 1,
              }}
            >
              <Typography>{team1}</Typography>
            </Box>
            <Typography>vs</Typography>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid #000",
                p: 2,
                mx: 1,
              }}
            >
              <Typography>{team2}</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              mt: 4,
            }}
          >
            <Typography>Chọn Ngày Chơi:</Typography>
            <TextField
              type="date"
              value={playingDate}
              onChange={(e) => setPlayingDate(e.target.value)}
              style={{
                marginLeft: "8px",
                width: "300px",
                margin: "0 8px",
                backgroundColor: "white",
              }}
            />
            <Typography>Chọn Sân:</Typography>
            <Select
              value={courtId}
              onChange={(e) => setCourtId(e.target.value)}
              style={{ width: "300px", margin: "0 8px" }}
            >
              {courtOptions.map((court) => (
                <MenuItem key={court.id} value={court.id}>
                  {court.name}
                </MenuItem>
              ))}
            </Select>
            <Typography>Chọn Thời Gian:</Typography>
            <Select
              value={courtSlotId}
              onChange={(e) => setCourtSlotId(e.target.value)}
              style={{ width: "300px", margin: "0 8px" }}
            >
              {courtSlotOptions.map((slot) => (
                <MenuItem key={slot.id} value={slot.id}>
                  {slot.time}
                </MenuItem>
              ))}
            </Select>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Sét thời gian
            </Button>
          </Box>
        </>
      )}
      {mode === "Score" && (
        <>
          <Typography variant="h6" component="h2">
            Báo Cáo Điểm
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography>{team1}</Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography>Trận 1:</Typography>
                  <TextField
                    type="number"
                    value={scores1[0]}
                    onChange={(e) => handleScoreChange(1, 0, e.target.value)}
                    style={{
                      width: "80px",
                      margin: "8px 0",
                      backgroundColor: "#3B937E",
                    }}
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography>Trận 2:</Typography>
                  <TextField
                    type="number"
                    value={scores1[1]}
                    onChange={(e) => handleScoreChange(1, 1, e.target.value)}
                    style={{
                      width: "80px",
                      margin: "8px 0",
                      backgroundColor: "#3B937E",
                    }}
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography>Trận 3:</Typography>
                  <TextField
                    type="number"
                    value={scores1[2]}
                    onChange={(e) => handleScoreChange(1, 2, e.target.value)}
                    style={{
                      width: "80px",
                      margin: "8px 0",
                      backgroundColor: "#3B937E",
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography>{team2}</Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography>Trận 1:</Typography>
                  <TextField
                    type="number"
                    value={scores2[0]}
                    onChange={(e) => handleScoreChange(2, 0, e.target.value)}
                    style={{
                      width: "80px",
                      margin: "8px 0",
                      backgroundColor: "#3B937E",
                    }}
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography>Trận 2:</Typography>
                  <TextField
                    type="number"
                    value={scores2[1]}
                    onChange={(e) => handleScoreChange(2, 1, e.target.value)}
                    style={{
                      width: "80px",
                      margin: "8px 0",
                      backgroundColor: "#3B937E",
                    }}
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography>Trận 3:</Typography>
                  <TextField
                    type="number"
                    value={scores2[2]}
                    onChange={(e) => handleScoreChange(2, 2, e.target.value)}
                    style={{
                      width: "80px",
                      margin: "8px 0",
                      backgroundColor: "#3B937E",
                    }}
                  />
                </Box>
              </Box>
            </Box>
            <Typography>Người Chiến Thắng: </Typography>
            <Typography>
              {winner ? winner : "Chưa có người chiến thắng"}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4,
            }}
          >
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Cập nhật score
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Form;

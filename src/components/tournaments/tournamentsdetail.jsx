import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
} from "@mui/material";
import api from "../../config/axios";
import { Outlet, useParams } from "react-router-dom";
import { tokens } from "../../theme";

const TournamentDetail = () => {
  const { id: contestId } = useParams();
  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  sessionStorage.setItem("contestId", contestId);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const fetchContestDetails = async () => {
      setLoading(true);
      if (!contestId) {
        setError("Invalid contest ID");
        setLoading(false);
        return;
      }
      try {
        console.log(`Fetching details for contest ID: ${contestId}`);
        const response = await api.get(`/contest/${contestId}`);
        console.log("Contest data:", response.data);
        setContest(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch contest details:", error);
        setError("Failed to fetch contest details. Please try again later.");
        setLoading(false);
      }
    };

    fetchContestDetails();
  }, [contestId]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  if (!contest) {
    return <Typography>No contest data available.</Typography>;
  }

  return (
    <Box margin="20px" sx={{ backgroundColor: colors.primary[500] }}>
      <Card style={{ marginBottom: "50px" }}>
        <CardContent>
          <Typography variant="h2" gutterBottom>
            {contest.name}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: colors.greenAccent[500],
              display: "flex",
              justifyContent: "center",
            }}
          >
            {contest.startDate} - {contest.endDate}
          </Typography>
        </CardContent>

        <CardMedia
          component="img"
          height="500"
          image={contest.urlBanner}
          alt="Contest Banner"
        />

        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ display: "flex", justifyContent: "center" }}
          >
            Chi tiết
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <strong
              style={{
                color: colors?.error?.main || "#EF1212",
                marginRight: "10px",
              }}
            >
              Giải nhất:
            </strong>
            {contest.firstPrize} VND
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <strong
              style={{
                color: colors?.secondary?.main || "#EE9191",
                marginRight: "10px",
              }}
            >
              Giải nhì:
            </strong>
            {contest.secondPrize} VND
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong style={{ color: colors?.success?.main || "#57E314" }}>
              Phí tham gia:
            </strong>
            {contest.participationPrice} VND
          </Typography>
        </CardContent>
      </Card>
      <Outlet />
    </Box>
  );
};

export default TournamentDetail;

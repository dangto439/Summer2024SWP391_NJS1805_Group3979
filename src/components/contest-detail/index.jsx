import { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Button,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../config/axios";
import ConfirmRegistration from "../register-contest";

const ContestDetailPage = () => {
  const { id: contestId } = useParams();
  const [contest, setContest] = useState([]);
  const [clubId, setClubId] = useState(null);
  const [club, setClub] = useState([]);
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchContestDetails = async () => {
      try {
        const response = await api.get(`/contest/${contestId}`);
        if (response.status === 200) {
          setContest(response.data);
          setClubId(response.data.clubId);
        } else {
          console.error(
            "Error fetching contest details. Status:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error fetching contest details: ", error);
      }
    };
    fetchContestDetails();
  }, [contestId]);

  useEffect(() => {
    const fetchClubDetails = async (clubId) => {
      try {
        const response = await api.get(`/club/${clubId}`);
        if (response.status === 200) {
          setClub(response.data);
        } else {
          console.error(
            "Error fetching club details. Status:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error fetching club details: ", error);
      }
    };

    if (clubId) {
      fetchClubDetails(clubId);
    }
  }, [clubId]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };
  const handleShowDetailClub = (club) => {
    console.log(club);
    navigate(`/club-detail/${club.clubId}`);
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <Typography
            variant="h2"
            gutterBottom
            sx={{ backgroundColor: "#569284", color: "whitesmoke" }}
          >
            {contest.name}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: "#7C7C7B",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CalendarMonthIcon />
            {contest.startDate} - {contest.endDate}
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "30px",
            }}
          >
            <strong style={{ color: "#57E314", marginRight: "10px" }}>
              Phí tham gia:{" "}
            </strong>
            {contest.participationPrice} ₫
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "flex", justifyContent: "center" }}
          >
            Giải Thưởng
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <strong style={{ color: "#EF1212", marginRight: "10px" }}>
              Giải nhất:
            </strong>
            {contest.firstPrize} ₫
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <strong style={{ color: "#EE9191", marginRight: "10px" }}>
              Giải nhì:
            </strong>
            {contest.secondPrize} ₫
          </Typography>
        </CardContent>
      </Card>

      <Card className="contest-banner">
        <CardMedia
          component="img"
          height="500"
          image={contest.urlBanner}
          alt="Contest Banner"
        />
      </Card>
      <Card>
        <CardContent>
          <Box>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              Nhà tổ chức
            </Typography>
            <Typography
              variant="h5"
              onClick={() => handleShowDetailClub(club)}
              sx={{
                color: "blue",
                display: "flex",
                justifyContent: "center",
                marginBottom: "10px",
              }}
            >
              {club.clubName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Hotline:</strong> {club.hotline}
            </Typography>

            <CardMedia
              component="img"
              height="500"
              image={
                club.urlImages && club.urlImages.length > 0
                  ? club.urlImages[0]
                  : ""
              }
              alt="Club Image"
            />

            <Box mt={2} display="flex" justifyContent="center">
              {location.pathname.startsWith("/contest/sapdienra") && (
                <Box mt={2} display="flex" justifyContent="flex-start">
                  <Button
                    component={Link}
                    to={`/contest/sapdienra`}
                    variant="contained"
                    sx={{ marginRight: "15px", backgroundColor: "#6992CE" }}
                  >
                    Quay lại
                  </Button>
                  <Button
                    onClick={showModal}
                    component={Link}
                    variant="contained"
                    sx={{ backgroundColor: "#B84848" }}
                  >
                    Tham gia
                  </Button>
                  <ConfirmRegistration
                    visible={isModalVisible}
                    onClose={handleClose}
                    id={contest.contestId}
                  />
                </Box>
              )}
              {location.pathname.startsWith("/contest/dangdienra") && (
                <Box mt={2} display="flex" justifyContent="flex-start">
                  <Button
                    component={Link}
                    to={`/contest/dangdienra`}
                    variant="contained"
                    sx={{ marginRight: "15px", backgroundColor: "#6992CE" }}
                  >
                    Quay lại
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ContestDetailPage;

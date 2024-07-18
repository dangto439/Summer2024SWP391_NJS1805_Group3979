import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Button,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link } from "react-router-dom";

// Dữ liệu giả lập cho cuộc thi
const contest = {
  contestId: 1,
  participationPrice: 50,
  capacity: 100,
  name: "Summer Tournament",
  firstPrize: 500,
  secondPrize: 200,
  startDate: "2024-07-17",
  endDate: "2024-07-20",
  clubId: 1,
  urlBanner: "https://example.com/banner.jpg",
};

// Dữ liệu giả lập cho câu lạc bộ
const club = {
  clubId: 1,
  clubName: "Example Club",
  clubAddress: "123 Club Street",
  district: "District 1",
  province: "Example Province",
  openTime: "09:00 AM",
  closeTime: "06:00 PM",
  hotline: "+123456789",
  clubStatus: "ACTIVE",
  description:
    "Example Club is a premier sports club offering various facilities and events.",
  urlImages: [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
  ],
};

const ContestDetailPage = () => {
  return (
    <Box className="contest-detail-page">
      <Card>
        <CardContent>
          <Typography variant="h2" gutterBottom>
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

          <Typography variant="body1" gutterBottom>
            <strong style={{ color: "#57E314" }}>Phí tham gia: </strong>
            {contest.participationPrice} VND
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

      <Card className="contest-prizes">
        <CardContent>
          <Typography
            variant="h3"
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
            {contest.firstPrize} VND
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
            {contest.secondPrize} VND
          </Typography>
        </CardContent>
      </Card>

      <Card className="contest-organizer">
        <CardContent>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ display: "flex", justifyContent: "center" }}
          >
            Nhà tổ chức
          </Typography>
          <Box className="club-info">
            <a href="/club-detail" className="club-name">
              {club.clubName}
            </a>
            <CardMedia
              component="img"
              height="500"
              image={club.urlImages[0]}
              alt="Club Image"
            />
            <Typography variant="body1" gutterBottom>
              <strong>Hotline:</strong> {club.hotline}
            </Typography>
            <Box mt={2} display="flex" justifyContent="center">
              <Button
                component={Link}
                to={`/contest/sapdienra`}
                variant="contained"
                sx={{ marginRight: "15px", backgroundColor: "#6992CE" }}
              >
                Quay lại
              </Button>
              <Button
                component={Link}
                to={`/contest/sapdienra/thamgia/${contest.contestId}`}
                variant="contained"
                sx={{ backgroundColor: "#B84848" }}
              >
                Tham gia
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ContestDetailPage;

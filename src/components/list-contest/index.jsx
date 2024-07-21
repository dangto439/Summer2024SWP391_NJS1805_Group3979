import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Divider, Pagination } from "@mui/material";
import { useLocation, Link, Outlet, useOutletContext } from "react-router-dom";
import api from "../../config/axios";

const ListContest = () => {
  const { searchQuery } = useOutletContext();
  const [contests, setContests] = useState([]);
  const [filteredContests, setFilteredContests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const location = useLocation();
  const today = new Date();

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await api.get("/contests");
        setContests(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchContests();
  }, []);

  useEffect(() => {
    const filterContests = () => {
      const contestsNotStart = contests.filter(
        (contest) => new Date(contest.startDate) > today
      );
      const contestsStart = contests.filter(
        (contest) => new Date(contest.startDate) <= today
      );

      let filtered = [];

      if (
        location.pathname === "/contest" ||
        location.pathname === "/contest/dangdienra"
      ) {
        filtered = contestsStart;
      } else if (location.pathname === "/contest/sapdienra") {
        filtered = contestsNotStart;
      }

      if (searchQuery) {
        filtered = filtered.filter((contest) =>
          contest.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      setFilteredContests(filtered);
    };

    filterContests();
  }, [location.pathname, contests, today, searchQuery]);

  const hotContests = [
    {
      imgSrc: "https://via.placeholder.com/50",
      alt: "Tin tức 1",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      imgSrc: "https://via.placeholder.com/50",
      alt: "Tin tức 2",
      content:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      imgSrc: "https://via.placeholder.com/50",
      alt: "Tin tức 3",
      content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];

  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${month} năm ${year}`;
  };

  const renderContests = () => {
    if (!Array.isArray(filteredContests)) {
      return null;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentContests = filteredContests.slice(
      startIndex,
      startIndex + itemsPerPage
    );

    return currentContests.map((contest) => (
      <Box key={contest.contestId} mb={3}>
        <Box display="flex" alignItems="center" mt={2}>
          <Typography variant="h6" color="textSecondary" sx={{ mr: 2 }}>
            {formatDate(contest.startDate)}
          </Typography>
          <Divider sx={{ flexGrow: 1 }} />
        </Box>

        <Box display="flex" mt={2}>
          <img
            src={contest.urlBanner}
            alt={contest.name}
            style={{ width: "300px", height: "200px", marginRight: "100px" }}
          />
          <Box>
            <Typography variant="h5" color="primary" textAlign="left">
              {contest.name}
            </Typography>
            <Typography variant="body1" textAlign="left">
              <strong>Ngày bắt đầu:</strong> {contest.startDate}
              <br />
              <strong>Ngày kết thúc:</strong> {contest.endDate}
              <br />
              <strong>Phần thưởng nhất:</strong> {contest.firstPrize}
              <br />
              <strong>Phần thưởng nhì:</strong> {contest.secondPrize}
              <br />
              <strong>Số lượng:</strong> {contest.capacity}
            </Typography>
            {location.pathname === "/contest/sapdienra" && (
              <Box mt={2} display="flex" justifyContent="flex-start">
                <Button
                  component={Link}
                  to={`/contest/sapdienra/chitiet/${contest.contestId}`}
                  variant="contained"
                  sx={{ marginRight: "15px", backgroundColor: "#6992CE" }}
                >
                  Chi tiết
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
            )}
            {location.pathname === "/contest/dangdienra" ||
            location.pathname === "/contest" ? (
              <Box mt={2} display="flex" justifyContent="center">
                <Button
                  component={Link}
                  to={`/contest/dangdienra/chitiet2/${contest.contestId}`}
                  variant="contained"
                  sx={{ marginRight: "15px", backgroundColor: "#6992CE" }}
                >
                  Chi tiết
                </Button>
              </Box>
            ) : null}
          </Box>
        </Box>
      </Box>
    ));
  };

  const renderHotContests = () => {
    return hotContests.map((news, index) => (
      <Box
        key={index}
        display="flex"
        mb={2}
        border="1px solid #ddd"
        p={1}
        borderRadius={1}
      >
        <img
          src={news.imgSrc}
          alt={news.alt}
          style={{ marginRight: "10px" }}
          height="100px"
        />
        <Typography variant="body1">{news.content}</Typography>
      </Box>
    ));
  };

  // const handlePageChange = (event, value) => {
  //   setCurrentPage(value);
  // };

  return (
    <Box display="flex" p={2}>
      <Box flex="2" mr={10}>
        <Box mt={3}>{renderContests()}</Box>
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={Math.ceil((filteredContests?.length || 0) / itemsPerPage)}
            page={currentPage}
            // onChange={handlePageChange}
            onChange={(event, page) => setCurrentPage(page)}
          />
        </Box>
      </Box>

      <Box flex="1" position="sticky" maxHeight="100vh" overflow="auto">
        <Typography
          variant="h6"
          color="primary"
          sx={{
            textAlign: "center",
            borderBottom: "2px solid #78B9A9",
            marginBottom: "15px",
            paddingBottom: "10px",
          }}
        >
          CUỘC THI ĐANG ĐƯỢC CHÚ Ý
        </Typography>
        {renderHotContests()}
      </Box>
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default ListContest;

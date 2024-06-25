import { useState } from "react";
import { Box, Button, Typography, Divider, Pagination } from "@mui/material";
import { Routes, Route } from "react-router-dom";

const ListContest = ({ contests }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

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

  // Để tháng viết hoa được thành Tháng được
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${month} năm ${year}`;
  };

  const renderContests = () => {
    // Kiểm tra contests có phải là mảng hay không
    if (!Array.isArray(contests)) {
      return null;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentContests = contests.slice(
      startIndex,
      startIndex + itemsPerPage
    );

    return currentContests.map((contest) => (
      <Box key={contest.id} mb={3}>
        <Box display="flex" alignItems="center" mt={2}>
          <Typography variant="h6" color="textSecondary" sx={{ mr: 2 }}>
            {formatDate(contest.date)}
          </Typography>
          <Divider sx={{ flexGrow: 1 }} />
        </Box>

        <Box display="flex" mt={2}>
          {/* Phải get cả hình của contest, khum có thì phải có hình gì đấy mặc định cho ngta để cho đẹp */}
          <img
            src="https://via.placeholder.com/150"
            alt={contest.name}
            style={{ width: "300px", height: "200px", marginRight: "100px" }}
          />
          <Box>
            <Typography variant="h5" color="primary">
              {contest.name}
            </Typography>
            <Typography variant="body1">
              <strong>Ngày:</strong>{" "}
              {new Date(contest.date).toLocaleDateString()}
              <br />
              <strong>Địa điểm:</strong> {contest.location}
              <br />
              <strong>Thời gian bắt đầu:</strong> {contest.startime}
              <br />
              <strong>Thời gian kết thúc:</strong> {contest.endtime}
              <br />
              <strong>Mô tả:</strong> {contest.description}
              <br />
              <strong>Số lượng:</strong> {contest.scale}
              <br />
              <strong>Số liên hệ:</strong> {contest.phonenumber}
            </Typography>
            <Box mt={2}>
              <Button
                variant="contained"
                sx={{
                  marginRight: "15px",
                  backgroundColor: "#6992CE",
                }}
              >
                Chi tiết
              </Button>
              <Button variant="contained" sx={{ backgroundColor: "#B84848" }}>
                Tham gia
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    ));
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box p={3} ml={3}>
      <Routes>
        <Route path="" element={<Box mt={3}>{renderContests()}</Box>} />
      </Routes>

      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={Math.ceil((contests?.length || 0) / itemsPerPage)} // Sử dụng ?. để tránh lỗi khi contests là null hoặc undefined
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default ListContest;

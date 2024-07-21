import { Box, useTheme, Button } from "@mui/material";
import Header from "../dashboard/Header";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import api from "../../config/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";

const Tournaments = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const handleCreateATournament = () => {
    navigate("/dashboard/tournaments/new");
  };

  // const fetchContestDetails = async (contestId) => {
  //   try {
  //     const response = await api.get(`/contest/${contestId}`);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Failed to fetch contest details:", error);
  //   }
  // };

  const handleViewClick = (contestId) => {
    navigate(`/dashboard/tournaments/detail/${contestId}`);
  };

  const allColumns = [
    {
      field: "clubName",
      flex: 1,
      headerName: "Câu lạc bộ",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "name",
      headerName: "Cuộc thi",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "capacity",
      headerName: "Quy mô",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "startDate",
      headerName: "Ngày bắt đầu",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "endDate",
      headerName: "Ngày kết thúc",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "view",
      headerName: "Chi tiết",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Button onClick={() => handleViewClick(params.id)}>
          <VisibilityIcon />
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const fetchContest = async () => {
      const response = await api.get(`/contest/current-account/${user.id}`);
      const updatedRows = await Promise.all(
        response.data.map(async (item) => {
          const club = await api.get(`/club/${item.clubId}`);
          return { ...item, clubName: club.data.clubName };
        })
      );
      setRows(updatedRows);
    };
    fetchContest();
  }, []);

  return (
    <Box>
      <Header
        title="Các cuộc thi của bạn"
        subtitle=""
        buttonText="Tạo cuộc thi mới"
        onButtonClick={handleCreateATournament}
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.greenAccent[800],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.greenAccent[800],
          },
          "& .MuiDataGrid-columnHeader": {
            display: "flex",
            justifyContent: "center",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={allColumns}
          getRowId={(row) => row.contestId}
        />
      </Box>
    </Box>
  );
};

export default Tournaments;

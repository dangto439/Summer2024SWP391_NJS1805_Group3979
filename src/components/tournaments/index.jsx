import { Box, useTheme, Button } from "@mui/material";
import Header from "../dashboard/Header";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Tournaments = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const navigate = useNavigate();

  const handleCreateATournament = () => {
    navigate("/dashboard/tournaments/new");
  };

  const allColumns = [
    {
      field: "clubname",
      headerName: "Câu lạc bộ",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "tournamentname",
      headerName: "Cuộc thi",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "capical",
      headerName: "Quy mô",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "startime",
      headerName: "Ngày bắt đầu",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "endtime",
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
        <Button component={Link} to={`detail/${params.id}`}>
          <VisibilityIcon />
        </Button>
      ),
    },
  ];

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
          getRowId={(row) => row.staffId}
        />
      </Box>
    </Box>
  );
};

export default Tournaments;

import { useEffect, useState } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme.js";
import Header from "../../components/dashboard/Header.jsx";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import DeleteButton from "../global/deletebutton";
import api from "../../config/axios.js";
import Forms from "./forms.jsx";
const Club = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [mode, setMode] = useState("");
  const [selectedClubId, setSelectedClubId] = useState("");

  const handleUpdate = (id) => {
    setMode("update");
    setSelectedClubId(id);
    console.log(id);
    setFormOpen(true);
  };

  const handleCreate = () => {
    setMode("create");
    setSelectedClubId(null);
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

  const handleFormSubmit = () => {
    handleFormClose();
  };

  const columns = [
    {
      field: "clubName",
      headerName: "Tên Club",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "clubAddress",
      headerName: "Địa chỉ",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "hotline",
      headerName: "Hotline",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "left",
      align: "left",
    },
    // {
    //   field: "age",
    //   headerName: "Số lượng sân",
    //   type: "number",
    //   headerAlign: "left",
    //   align: "left",
    // },
    // {
    //   field: "age",
    //   headerName: "Thời gian hoạt động",
    //   type: "number",
    //   headerAlign: "left",
    //   align: "left",
    // },

    {
      field: "description",
      headerName: "Mô tả",
      type: "number",
      headerAlign: "left",
      align: "left",
    },

    {
      field: "clubStatus",
      headerName: "Trạng thái",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "update",
      headerName: "Cập Nhật",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <IconButton
          onClick={() => handleUpdate(params.id)}
          sx={{ color: "#CE671B" }}
        >
          <PublishedWithChangesIcon />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Xóa",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <DeleteButton
          id={params.id}
          rows={rows}
          setRows={setRows}
          linkapi={"club"}
          fetfunction={fetchallClubs}
        />
      ),
    },
  ];

  const fetchallClubs = async () => {
    try {
      const response = await api.get(`current-clubs`);
      const clubs = response.data;

      const filteredClubs = clubs.filter(
        (club) => club.clubStatus !== "DELETED"
      );
      const rows = filteredClubs.map((club, index) => ({
        id: club.clubId || index,
        clubName: club.clubName,
        clubStatus: club.clubStatus,
        clubAddress: club.clubAddress,
        hotline: club.hotline,
        openTime: club.openTime,
        closeTime: club.closeTime,
        description: club.description,
      }));
      setRows(rows);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchallClubs();
  }, []);

  return (
    <Box m="20px" className="team-container">
      <Header
        title="Quản lý club"
        subtitle=""
        buttonText="Tạo club mới"
        onButtonClick={handleCreate}
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
          "&.MuIDataGrid-virtualScroller": {
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
        <DataGrid rows={rows} columns={columns} />
      </Box>
      <Forms
        open={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        fetFunction={fetchallClubs}
        mode={mode}
        id={selectedClubId}
      />
    </Box>
  );
};

export default Club;

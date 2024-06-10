import { useState } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme.js";
import { mockDataTeam } from "../../data/mockData.js";
import Header from "../../components/dashboard/Header.jsx";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./index.scss";
import CreateNewClubForm from "./createnewclubform.jsx";
const Club = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState(mockDataTeam);
  const [isCreateNewClub, setCreateNewClub] = useState(false);

  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this club?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            setRows(rows.filter((row) => row.id !== id));
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
      overlayClassName: "custom-confirm-alert-overlay",
    });
  };
  const handleUpdate = (id) => {};

  const handleFormOpen = () => {
    setCreateNewClub(true);
  };

  const handleFormClose = () => {
    setCreateNewClub(false);
  };

  const handleFormSubmit = (value) => {
    //Viết hàm submit vào đây nè
    handleFormClose();
  };

  const columns = [
    {
      field: "name",
      headerName: "Tên Club",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Địa chỉ",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Hotline",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "age",
      headerName: "Số lượng sân",
      type: "number",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "age",
      headerName: "Thời gian hoạt động",
      type: "number",
      headerAlign: "center",
      align: "center",
    },

    {
      field: "age",
      headerName: "Trạng thái",
      type: "number",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "update",
      headerName: "Cập Nhật Club",
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
      headerName: "Xóa Club",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <IconButton
          onClick={() => handleDelete(params.id)}
          sx={{ color: "#AF2525" }}
        >
          <DeleteOutlineIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box m="20px" className="team-container">
      <Header
        title="Manage Club"
        subtitle="Dĩm nè"
        buttonText="Thêm mới sân"
        onButtonClick={handleFormOpen}
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
      <CreateNewClubForm
        open={isCreateNewClub}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
      />
    </Box>
  );
};

export default Club;

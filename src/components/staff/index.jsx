import { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../dashboard/Header";
import AddNewStaffAccountForm from "./formaddnewstaffaccount";
import { useLocation } from "react-router-dom";
import DeleteButton from "../global/deletebutton";

const Staff = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [isAddFormOpen, setAddFormOpen] = useState(false);
  const location = useLocation();

  const handleAddNewStaffAccount = () => {
    setAddFormOpen(true);
  };

  const handleFormClose = () => {
    setAddFormOpen(false);
  };

  const handleFormSubmit = (value) => {
    // Viết hàm submit vào đây
    handleFormClose();
  };

  const allColumns = [
    {
      field: "clubid",
      headerName: "Club ID",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "id",
      headerName: "Staff ID",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "gender",
      headerName: "Gender",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "delete",
      headerName: "Delete Account",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <DeleteButton id={params.id} rows={rows} setRows={setRows} />
      ),
    },
  ];

  const columns =
    location.pathname === "/staff/clubid1"
      ? allColumns.filter((column) => column.field !== "clubid")
      : allColumns;

  return (
    <Box m="20px" className="team-container">
      <Header
        title="Manage Staff Account"
        subtitle="Dĩm nè"
        buttonText="Thêm mới Staff account"
        onButtonClick={handleAddNewStaffAccount}
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
        <DataGrid rows={rows} columns={columns} />
      </Box>
      <AddNewStaffAccountForm
        open={isAddFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
      />
    </Box>
  );
};

export default Staff;

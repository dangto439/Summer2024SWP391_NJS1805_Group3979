import { useEffect, useState } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme.js";
// import { mockDataTeam } from "../../data/mockData.js";
import Header from "../../components/dashboard/Header.jsx";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import AddNewCourtForm from "./addnewcourtform.jsx";
import DeleteButton from "../global/deletebutton";
const Club = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [isAddCourtFormOpen, setAddCourtFormOpen] = useState(false);

  const handleUpdate = (id) => {};

  const handleFormClose = () => {
    setAddCourtFormOpen(false);
  };
  const handleAddNewCourtForm = () => {
    setAddCourtFormOpen(true);
  };

  //viet 2 ham handlesubmit
  const handleFormSubmit = (value) => {
    //Viết hàm submit vào đây nè
    handleFormClose();
  };

  const columns = [
    {
      field: "courtid",
      headerName: "Mã Sân",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "courtName",
      headerName: "Tên Sân",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "courtStatus",
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
        <DeleteButton id={params.id} rows={rows} setRows={setRows} />
      ),
    },
  ];

  const fetchallClubs = async (id) => {
    try {
      const response = await api.get(`/courts/${id}`);
      const clubs = response.data;
      setRows(clubs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchallClubs(26);
  }, []);

  return (
    <Box m="20px" className="team-container">
      <Header
        title="Quản lý sân"
        subtitle=""
        buttonText="Tạo sân mới"
        onButtonClick={handleAddNewCourtForm}
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
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.courtId}
        />
      </Box>

      <AddNewCourtForm
        open={isAddCourtFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
      />
    </Box>
  );
};

export default Club;

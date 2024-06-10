import { useEffect, useState } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
// import { mockDataTeam } from "../data/mockData";
import Header from "../components/dashboard/Header";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./index.scss";
import ChooseFormDialog from "./chooseformdialog.jsx";
import AddNewCourtForm from "./addnewcourtform.jsx";
import CreateNewClubForm from "./createnewclubform.jsx";
import api from "../config/axios.js";
const Club = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  //   const [isAddFormOpen, setAddFormOpen] = useState(false);
  const [isChooseFormOpen, setChooseFormOpen] = useState(false);
  const [isAddCourtFormOpen, setAddCourtFormOpen] = useState(false);
  const [isCreateClubFormOpen, setCreateClubFormOpen] = useState(false);

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

  const handleChooseExistingClub = () => {
    setChooseFormOpen(false);
    setAddCourtFormOpen(true);
  };

  const handleChooseNewClub = () => {
    setChooseFormOpen(false);
    setCreateClubFormOpen(true);
  };

  const handleFormClose = () => {
    setChooseFormOpen(false);
    setAddCourtFormOpen(false);
    setCreateClubFormOpen(false);
  };
  const handleChooseFormOpen = () => {
    setChooseFormOpen(true);
  };

  //viet 2 ham handlesubmit
  const handleFormSubmit = (value) => {
    //Viết hàm submit vào đây nè
    handleFormClose();
  };

  const columns = [
    {
      field: "id",
      headerName: "Mã Club",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "courtId",
      headerName: "Mã Sân",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "courtName",
      headerName: "Tên Sân",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "courtStatus",
      headerName: "Trạng thái",
      type: "number",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "update",
      headerName: "Cập Nhật Sân",
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
      headerName: "Xóa Sân",
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
        title="Manage Staff Account"
        subtitle="Dĩm nè"
        buttonText="Thêm mới sân"
        onButtonClick={handleChooseFormOpen}
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
      <ChooseFormDialog
        open={isChooseFormOpen}
        onClose={() => setChooseFormOpen(false)}
        onChooseExistingClub={handleChooseExistingClub}
        onChooseNewClub={handleChooseNewClub}
      />
      <AddNewCourtForm
        open={isAddCourtFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
      />
      <CreateNewClubForm
        open={isCreateClubFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
      />
    </Box>
  );
};

export default Club;

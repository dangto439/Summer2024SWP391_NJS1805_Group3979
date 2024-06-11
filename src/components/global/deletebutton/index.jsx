import { IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import api from "../../../config/axios";

const handleConfirm = (id, rows, setRows, linkapi, fetfunction) => {
  confirmAlert({
    title: "Confirm to delete",
    message: "Are you sure you want to delete this account?",
    buttons: [
      {
        label: "Yes",
        onClick: () => handleDelete(id, linkapi, fetfunction),
      },
      {
        label: "No",
        onClick: () => {},
      },
    ],
    overlayClassName: "custom-confirm-alert-overlay",
  });
};

const handleDelete = async (id, linkapi, fetfunction) => {
  await api.delete(`/${linkapi}/${id}`);
  fetfunction();
};

const DeleteButton = ({ id, rows, setRows, linkapi, fetfunction }) => (
  <IconButton
    onClick={() => handleConfirm(id, rows, setRows, linkapi, fetfunction)}
    sx={{ color: "#AF2525" }}
  >
    <DeleteOutlineIcon />
  </IconButton>
);

export default DeleteButton;

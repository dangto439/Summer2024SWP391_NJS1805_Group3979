import { IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const handleDelete = (id, rows, setRows) => {
  confirmAlert({
    title: "Confirm to delete",
    message: "Are you sure you want to delete this account?",
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

const DeleteButton = ({ id, rows, setRows }) => (
  <IconButton
    onClick={() => handleDelete(id, rows, setRows)}
    sx={{ color: "#AF2525" }}
  >
    <DeleteOutlineIcon />
  </IconButton>
);

export default DeleteButton;

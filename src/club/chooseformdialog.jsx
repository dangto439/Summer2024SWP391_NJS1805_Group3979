import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const ChooseFormDialog = ({
  open,
  onClose,
  onChooseExistingClub,
  onChooseNewClub,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Bạn muốn tạo sân trong</DialogTitle>
      <DialogContent>
        <Button onClick={onChooseExistingClub} fullWidth>
          Club đã có
        </Button>
        <Button onClick={onChooseNewClub} fullWidth>
          Club mới
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChooseFormDialog;

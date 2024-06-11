import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";

const schema = yup.object().shape({
  clubId: yup.string().required("Club ID is required"),
  name: yup.string().required("Name is required"),
  numCourts: yup.number().required("Number of courts is required").min(1),
});

const AddNewCourtForm = ({ open, onClose, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Thêm sân mới</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <FormControl fullWidth margin="normal" error={!!errors.clubId}>
            <InputLabel>Club ID</InputLabel>
            <Controller
              name="clubId"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select {...field} label="Club ID">
                  <MenuItem value="ClubID1">ClubID1</MenuItem>
                  <MenuItem value="ClubID2">ClubID2</MenuItem>
                  <MenuItem value="ClubID3">ClubID3</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.clubId?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.name}>
            <TextField
              label="Name"
              {...control.register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.numCourts}>
            <InputLabel>Số lượng sân</InputLabel>
            <Controller
              name="numCourts"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select {...field} label="Số lượng sân">
                  {[...Array(10).keys()].map((n) => (
                    <MenuItem key={n + 1} value={n + 1}>
                      {n + 1}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>{errors.numCourts?.message}</FormHelperText>
          </FormControl>

          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Hủy
            </Button>
            <Button type="submit" color="primary">
              Tạo
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewCourtForm;

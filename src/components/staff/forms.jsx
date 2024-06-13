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
  yearOfBirth: yup
    .number()
    .required("Year of Birth is required")
    .min(1975)
    .max(new Date().getFullYear()),
  phone: yup
    .string()
    .matches(/(0[3|5|7|8|9])+([0-9]{8})\b/, "Invalid phone number")
    .required("Phone number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});

const AddStaffForm = ({ open, onClose, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (data) => {
    const age = new Date().getFullYear() - data.yearOfBirth;
    onSubmit({ ...data, age });
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 1975; year--) {
      years.push(year);
    }
    return years;
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Thêm mới Staff Account</DialogTitle>
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

          <FormControl fullWidth margin="normal" error={!!errors.yearOfBirth}>
            <InputLabel>Year of Birth</InputLabel>
            <Controller
              name="yearOfBirth"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select {...field} label="Year of Birth">
                  {generateYearOptions().map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>{errors.yearOfBirth?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.phone}>
            <TextField
              label="Phone Number"
              {...control.register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.email}>
            <TextField
              label="Email"
              {...control.register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
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

export default AddStaffForm;

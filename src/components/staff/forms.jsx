import React, { useEffect, useState } from "react";
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
import api from "../../config/axios";

const schema = yup.object().shape({
  clubId: yup.string().required("Club ID is required"),
  name: yup.string().required("Name is required"),
  phone: yup
    .string()
    .matches(/(0[3|5|7|8|9])+([0-9]{8})\b/, "Invalid phone number")
    .required("Phone number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  // gender: yup.string().required("Gender is required"),
  // password: yup.string().required("Password is required"),
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
    // const age = new Date().getFullYear() - data.yearOfBirth;
    // onSubmit({ ...data, age });
    const gender = "MALE";
    const password = data.phone;
    const response = { ...data, gender, password };
    onSubmit(response);
    handleAddNewStaff(response);
    // console.log(response);
  };

  const [clubs, setClubs] = useState([]);

  const fetchClubs = async () => {
    try {
      const response = await api.get("/current-clubs");
      setClubs(response.data);
    } catch (error) {
      console.error("Error fetching clubs:", error);
    }
  };

  const handleAddNewStaff = async (values) => {
    try {
      await api.post("/staff", values);
    } catch (error) {
      console.error("Error fetching clubs:", error);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Thêm mới Staff Account</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <FormControl fullWidth margin="normal" error={!!errors.clubId}>
            <InputLabel>Club Name</InputLabel>
            <Controller
              name="clubId"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select {...field} label="Club Name">
                  {clubs.map((club) => (
                    <MenuItem key={club.clubId} value={club.clubId}>
                      {club.clubName}
                    </MenuItem>
                  ))}
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

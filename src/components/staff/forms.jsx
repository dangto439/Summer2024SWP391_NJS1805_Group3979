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
import { message } from "antd";

const schema = yup.object().shape({
  clubId: yup.string().required("Vui lòng chọn Clb"),
  name: yup.string().required("Vui lòng nhập tên nhân viên"),
  phone: yup
    .string()
    .matches(
      /(0[3|5|7|8|9])+([0-9]{8})\b/,
      "Vui lòng kiểm tra lại số điện thoại"
    )
    .required("Phone number is required"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Vui lòng kiểm tra lại email"),
  // gender: yup.string().required("Gender is required"),
  // password: yup.string().required("Password is required"),
});

const AddStaffForm = ({ open, onClose, onSubmit, fetfunction }) => {
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
    fetfunction();
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
      message.error(error.response.data);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Thêm mới nhân viên</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <FormControl fullWidth margin="normal" error={!!errors.clubId}>
            <InputLabel>Tên Clb</InputLabel>
            <Controller
              name="clubId"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select {...field} label="Tên Clb">
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
              label="Tên Nhân viên"
              {...control.register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.phone}>
            <TextField
              label="Số điện thoại nhân viên"
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

import { useEffect, useState } from "react";
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
  Typography,
  useTheme,
} from "@mui/material";
import { Upload, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import api from "../../config/axios";
import uploadFile from "../../utils/upload";
import { tokens } from "../../theme";
// import dataProvnices from "../../../province";
import hours from "../../../hours";
import axios from "axios";

const schema = yup.object().shape({
  clubName: yup.string().required("Tên Club là bắt buộc"),
  clubDescription: yup.string().required("Mô tả là bắt buộc"),
  clubHotLine: yup
    .string()
    .required("Số hotline là bắt buộc")
    .matches(/^[0-9]+$/, "Chỉ cho phép nhập số"),
  capacity: yup.number().required("Số lượng sân là bắt buộc").min(1),
  // city: yup.string().required("Tỉnh / Thành phố là bắt buộc"),
  // district: yup.string().required("Quận / Huyện là bắt buộc"),
  clubAddress: yup.string().required("Địa chỉ cụ thể là bắt buộc"),
  openingTime: yup.string().required("Giờ mở cửa là bắt buộc"),
  closingTime: yup
    .number()
    .required("Giờ đóng cửa là bắt buộc")
    .test(
      "is-after-opening",
      "Giờ đóng cửa phải sau giờ mở cửa",
      function (closingTime, { parent }) {
        const openingTime = parent.openingTime;
        if (!openingTime || !closingTime) return true; // Bỏ qua nếu một trong hai không có giá trị
        return closingTime > openingTime;
      }
    ),

  starTimePeakHours: yup
    .number()
    .required("Bắt đầu giờ cao điểm là bắt buộc")
    .test(
      "is-in-range",
      "Giờ bắt đầu cao điểm phải nằm trong khoảng giờ mở cửa và đóng cửa",
      function (starTimePeakHours, { parent }) {
        const openingTime = parent.openingTime;
        const closingTime = parent.closingTime;
        if (!openingTime || !closingTime || !starTimePeakHours) return true;
        return (
          starTimePeakHours >= openingTime && starTimePeakHours <= closingTime
        );
      }
    ),

  endTimePeakHours: yup
    .number()
    .required("Kết thúc giờ cao điểm là bắt buộc")
    .test(
      "is-valid-time",
      "Giờ kết thúc cao điểm phải sau giờ bắt đầu và nằm trong khoảng giờ mở cửa và đóng cửa",
      function (endTimePeakHours, { parent }) {
        const starTimePeakHours = parent.starTimePeakHours;
        const openingTime = parent.openingTime;
        const closingTime = parent.closingTime;
        if (
          !openingTime ||
          !closingTime ||
          !starTimePeakHours ||
          !endTimePeakHours
        )
          return true;
        return (
          endTimePeakHours > starTimePeakHours &&
          endTimePeakHours <= closingTime
        );
      }
    ),
  price: yup.string().required("Giá của sân là bắt buộc"),
  courtPricePeakHours: yup
    .string()
    .required("Giá của sân giờ cao điểm là bắt buộc"),

  flexiblePercent: yup
    .string()
    .required("Giảm giá cho đặt lịch linh hoạt là bắt buộc")
    // .matches(/^\d+$/, "Giá trị phải là số nguyên dương")
    .test("is-between-0-100", "Giá trị phải từ 0 đến 100", function (value) {
      if (!value) return false;
      const intValue = parseInt(value, 10);
      return intValue >= 0 && intValue <= 100;
    }),
  fixedPercent: yup
    .string()
    .required("Giảm giá cho đặt lịch cố định là bắt buộc")
    // .matches(/^\d+$/, "Giá trị phải là số nguyên dương")
    .test("is-between-0-100", "Giá trị phải từ 0 đến 100", function (value) {
      if (!value) return false;
      const intValue = parseInt(value, 10);
      return intValue >= 0 && intValue <= 100;
    }),
});

const formatPrice = (value) => {
  const number = parseInt(value.replace(/\D/g, ""), 10);
  return isNaN(number) ? "" : new Intl.NumberFormat("de-DE").format(number);
};

const formatNumberWithPercent = (value) => {
  const cleanValue = value.replace(/[^\d.]/g, (match, offset) => {
    if (match === "." && offset === 0) {
      return match;
    }
    return "";
  });
  const number = parseFloat(cleanValue);
  const positiveNumber = isNaN(number) || number < 0 ? "" : number;
  const formattedValue = new Intl.NumberFormat("de-DE").format(positiveNumber);
  return `${formattedValue}%`;
};

const ClubForms = ({ open, onClose, onSubmit, fetFunction, mode, clubid }) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [districts, setDistricts] = useState([]);
  const [selectedCity, setSelectCity] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [provinceGhn, setProvinceGhn] = useState([]);
  const [districtGhn, setDistrictsGhn] = useState([]);

  useEffect(() => {
    if (mode === "update" && clubid) {
      //viet cu phap update du lieu tu DB len
      fetchDataForm();
    }
  }, [mode, clubid]);

  const fetchDataForm = async () => {
    const response = await api.get(`/club/${clubid}`);

    // console.log(response.data.province);
  };

  // hiển thị quận huyện tương ứng với city
  useEffect(() => {
    const FetchAllProvice = async () => {
      const response = await axios
        .get(
          "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
          {
            headers: {
              Token: "9f5dafd2-8d28-11ee-af43-6ead57e9219a",
            },
          }
        )
        .then((res) => {
          const formatData = res.data.data.map((province) => ({
            value: province.ProvinceID,
            label: province.ProvinceName,
          }));
          setProvinceGhn(formatData);
          // console.log(provinceGhn);
        });
    };
    FetchAllProvice();
  }, []);

  const handleClose = () => {
    reset();
    onClose();
  };

  //urlImages
  const handleFormSubmit = async (data) => {
    const uploadPromises = fileList.map(async (file) => {
      const downloadURL = await uploadFile(file.originFileObj);
      return downloadURL;
    });
    const uploadedUrls = await Promise.all(uploadPromises);
    const rushHourRequest = {
      startTime: parseInt(data.starTimePeakHours, 10),
      endTime: parseInt(data.endTimePeakHours, 10),
      rushPrice: parseInt(data.courtPricePeakHours.replace(/\./g, ""), 10),
    };

    const resProv = provinceGhn.find((item) => item.value === selectedCity);

    const resDis = districtGhn.find((item) => item.value === data.district);

    const adjustedData = {
      clubName: data.clubName,
      clubDescription: data.clubDescription,
      clubAddress: data.clubAddress,
      district: resDis.label,
      province: resProv.label,
      clubHotLine: data.clubHotLine,
      capacity: data.capacity,
      openingTime: parseInt(data.openingTime, 10),
      closingTime: parseInt(data.closingTime, 10),
      urlImages: uploadedUrls,
    };

    const courslotData = {
      price: parseInt(data.price.replace(/\./g, ""), 10),
      rushHourRequest: rushHourRequest,
    };

    const discountRuleData = {
      flexiblePercent: parseInt(data.flexiblePercent, 10),
      fixedPercent: parseInt(data.fixedPercent, 10),
    };

    try {
      if (mode === "create") {
        // console.log(adjustedData.urlImages);
        const reponse = await api.post("/club", adjustedData);
        const [response1, response2] = await Promise.all([
          api.post(`/court-slot/${reponse.data.clubId}`, courslotData),
          api.post(`/discount-rule/${reponse.data.clubId}`, discountRuleData),
        ]);
        await fetFunction();
      } else if (mode === "update" && clubid) {
        await api.put(`/club/${clubid}`, adjustedData);

        await api.post(`/court-slot/${clubid}`, courslotData); // update court lost

        await api.post(`/discount-rule/${clubid}`, discountRuleData);
        await fetFunction();
      }
      reset();
      onClose();
    } catch (error) {
      console.error("tạo sân thất bại!");
    }
  };

  const handlePreview = async (file) => {
    setPreviewImage(file.thumbUrl);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleRemove = (file) => {
    setFileList((prevFileList) =>
      prevFileList.filter((prevFile) => prevFile.uid !== file.uid)
    );
  };

  const fetchDistrict = async (data) => {
    const response = await axios
      .get(
        "https://online-gateway.ghn.vn/shiip/public-api/master-data/district",
        {
          params: { province_id: data },
          headers: {
            Token: "9f5dafd2-8d28-11ee-af43-6ead57e9219a",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const formatData = res.data.data.map((district) => ({
          value: district.DistrictID,
          label: district.DistrictName,
        }));
        setDistrictsGhn(formatData);
      });
  };

  const handleProvinceChange = (event) => {
    // console.log(value.target);
    setSelectCity(event.target.value);
    fetchDistrict(event.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: colors.grey[900],
          padding: "20px",
          borderRadius: "20px",
        },
      }}
    >
      <DialogTitle
        color={colors.greenAccent[500]}
        margin="10px"
        fontSize="25px"
      >
        {mode === "create" ? "Tạo Mới CLB" : "Cập Nhật CLB"}
      </DialogTitle>
      <Typography
        marginRight="60%"
        color={colors.redAccent[500]}
        fontSize="12px"
      >
        *Tất cả các trường đều bắt buộc
      </Typography>

      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Controller
            name="clubName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Tên CLB"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.clubName}
                helperText={errors.clubName?.message}
              />
            )}
          />
          <Controller
            name="clubDescription"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Mô tả"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                error={!!errors.clubDescription}
                helperText={errors.clubDescription?.message}
              />
            )}
          />
          <Controller
            name="clubHotLine"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Hotline"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.clubHotLine}
                helperText={errors.clubHotLine?.message}
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
              />
            )}
          />
          <Controller
            name="capacity"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Số lượng sân dự kiến"
                variant="outlined"
                fullWidth
                margin="normal"
                type="number"
                error={!!errors.capacity}
                helperText={errors.capacity?.message}
              />
            )}
          />

          <Controller
            name="openingTime"
            control={control}
            render={({ field }) => (
              <FormControl
                fullWidth
                variant="outlined"
                margin="normal"
                error={!!errors.openingTime}
              >
                <InputLabel>Giờ mở cửa</InputLabel>
                <Select {...field} label="Giờ mở cửa">
                  {hours.map((hour) => (
                    <MenuItem key={hour.value} value={hour.value}>
                      {hour.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.openingTime?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="closingTime"
            control={control}
            render={({ field }) => (
              <FormControl
                fullWidth
                variant="outlined"
                margin="normal"
                error={!!errors.closingTime}
              >
                <InputLabel>Giờ đóng cửa</InputLabel>
                <Select {...field} label="Giờ đóng cửa">
                  {hours.map((hour) => (
                    <MenuItem key={hour.value} value={hour.value}>
                      {hour.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.closingTime?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="starTimePeakHours"
            control={control}
            render={({ field }) => (
              <FormControl
                fullWidth
                variant="outlined"
                margin="normal"
                error={!!errors.starTimePeakHours}
              >
                <InputLabel>Giờ bắt đầu giờ cao điểm</InputLabel>
                <Select {...field} label="Giờ bắt đầu giờ cao điểm">
                  {hours.map((hour) => (
                    <MenuItem key={hour.value} value={hour.value}>
                      {hour.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {errors.starTimePeakHours?.message}
                </FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="endTimePeakHours"
            control={control}
            render={({ field }) => (
              <FormControl
                fullWidth
                variant="outlined"
                margin="normal"
                error={!!errors.endTimePeakHours}
              >
                <InputLabel>Giờ kết thúc giờ cao điểm</InputLabel>
                <Select {...field} label="Giờ kết thúc giờ cao điểm">
                  {hours.map((hour) => (
                    <MenuItem key={hour.value} value={hour.value}>
                      {hour.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {errors.endTimePeakHours?.message}
                </FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Giá của sân (VND)"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.price}
                helperText={errors.price?.message}
                onChange={(e) => {
                  const formattedValue = formatPrice(e.target.value);
                  field.onChange(formattedValue);
                }}
              />
            )}
          />
          <Controller
            name="courtPricePeakHours"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Giá của sân giờ cao điểm (VND)"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.courtPricePeakHours}
                helperText={errors.courtPricePeakHours?.message}
                onChange={(e) => {
                  const formattedValue = formatPrice(e.target.value);
                  field.onChange(formattedValue);
                }}
              />
            )}
          />
          <Controller
            name="flexiblePercent"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Giảm giá cho đặt lịch linh hoạt (%)"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.flexiblePercent}
                helperText={errors.flexiblePercent?.message}
                onChange={(e) => {
                  const formattedValue = formatNumberWithPercent(
                    e.target.value
                  );
                  field.onChange(formattedValue);
                }}
              />
            )}
          />
          <Controller
            name="fixedPercent"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Giảm giá cho đặt lịch cố định (%)"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.fixedPercent}
                helperText={errors.fixedPercent?.message}
                onChange={(e) => {
                  const formattedValue = formatNumberWithPercent(
                    e.target.value
                  );
                  field.onChange(formattedValue);
                }}
              />
            )}
          />

          <Controller
            name="city"
            control={control}
            value={selectedCity}
            render={({ field }) => (
              <FormControl
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!errors.city}
              >
                <InputLabel>Tỉnh / Thành Phố</InputLabel>
                <Select
                  {...field}
                  label="Tỉnh / Thành Phố"
                  onChange={handleProvinceChange}
                >
                  {provinceGhn.map((city, index) => (
                    <MenuItem key={index} value={city.value}>
                      {city.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.city?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="district"
            control={control}
            render={({ field }) => (
              <FormControl
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!errors.district}
              >
                <InputLabel>Quận / Huyện</InputLabel>
                <Select {...field} label="Quận / Huyện">
                  {districtGhn.map((district, index) => (
                    <MenuItem key={index} value={district.value}>
                      {district.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.district?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="clubAddress"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Địa chỉ cụ thể"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.clubAddress}
                helperText={errors.clubAddress?.message}
              />
            )}
          />
          <div>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              onRemove={handleRemove}
              beforeUpload={() => false} // Prevent automatic upload
            >
              {fileList.length >= 8 ? null : <PlusOutlined />}
            </Upload>
            <Image
              src={previewImage}
              style={{
                display: previewOpen ? "block" : "none",
                width: "100%",
              }}
            />
          </div>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Hủy
            </Button>
            <Button type="submit" color="primary" variant="contained">
              {mode === "create" ? "Tạo mới" : "Cập nhật"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ClubForms;

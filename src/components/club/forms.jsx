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

const schema = yup.object().shape({
  clubName: yup.string().required("Tên Club là bắt buộc"),
  clubDescription: yup.string().required("Mô tả là bắt buộc"),
  clubHotLine: yup.string().required("Số hotline là bắt buộc"),
  capacity: yup.number().required("Số lượng sân là bắt buộc").min(1),
  city: yup.string().required("Tỉnh / Thành phố là bắt buộc"),
  district: yup.string().required("Quận / Huyện là bắt buộc"),
  clubAddress: yup.string().required("Địa chỉ cụ thể là bắt buộc"),
  openingTime: yup.string().required("Giờ mở cửa là bắt buộc"),
  closingTime: yup
    .string()
    .required("Giờ đóng cửa là bắt buộc")
    .test(
      "is-greater-than-opening",
      "Giờ đóng cửa phải sau giờ mở cửa",
      function (value) {
        const { openingTime } = this.parent;
        if (!openingTime || !value) return false;

        const convertToInt = (timeStr) => {
          const [hour, minute] = timeStr.split(":").map(Number);
          return hour * 60 + minute;
        };

        const openingTimeInt = convertToInt(openingTime);
        const closingTimeInt = convertToInt(value);
        return closingTimeInt > openingTimeInt;
      }
    ),
  starTimePeakHours: yup
    .string()
    .required("Bắt đầu giờ cao điểm là bắt buộc")
    .test(
      "is-after-opening-time",
      "Bắt đầu giờ cao điểm phải sau Giờ mở cửa và trước Giờ đóng cửa",
      function (value) {
        const { openingTime, closingTime } = this.parent;
        if (!openingTime || !closingTime || !value) return false;

        const convertToInt = (timeStr) => {
          const [hour, minute] = timeStr.split(":").map(Number);
          return hour * 60 + minute;
        };

        const openingTimeInt = convertToInt(openingTime);
        const closingTimeInt = convertToInt(closingTime);
        const startTimePeakHoursInt = convertToInt(value);
        return (
          startTimePeakHoursInt > openingTimeInt &&
          startTimePeakHoursInt < closingTimeInt
        );
      }
    ),
  endTimePeakHours: yup
    .string()
    .required("Kết thúc giờ cao điểm là bắt buộc")
    .test(
      "is-after-start-time-peak-hours",
      "Kết thúc giờ cao điểm phải sau Bắt đầu giờ cao điểm và trước Giờ đóng cửa",
      function (value) {
        const { starTimePeakHours, closingTime } = this.parent;
        if (!starTimePeakHours || !closingTime || !value) return false;

        const convertToInt = (timeStr) => {
          const [hour, minute] = timeStr.split(":").map(Number);
          return hour * 60 + minute;
        };

        const startTimePeakHoursInt = convertToInt(starTimePeakHours);
        const closingTimeInt = convertToInt(closingTime);
        const endTimePeakHoursInt = convertToInt(value);
        return (
          endTimePeakHoursInt > startTimePeakHoursInt &&
          endTimePeakHoursInt < closingTimeInt
        );
      }
    ),
  courtPrice: yup.string().required("Giá của sân là bắt buộc"),
  courtPricePeakHours: yup
    .string()
    .required("Giá của sân giờ cao điểm là bắt buộc"),

  flexiblePercent: yup
    .string()
    .required("Giảm giá cho đặt lịch linh hoạt là bắt buộc")
    .matches(/^\d+$/, "Giá trị phải là số nguyên dương")
    .test("is-between-0-100", "Giá trị phải từ 0 đến 100", function (value) {
      if (!value) return false;
      const intValue = parseInt(value, 10);
      return intValue >= 0 && intValue <= 100;
    }),
  fixedPercent: yup
    .string()
    .required("Giảm giá cho đặt lịch cố định là bắt buộc")
    .matches(/^\d+$/, "Giá trị phải là số nguyên dương")
    .test("is-between-0-100", "Giá trị phải từ 0 đến 100", function (value) {
      if (!value) return false;
      const intValue = parseInt(value, 10);
      return intValue >= 0 && intValue <= 100;
    }),
});

const data = {
  "Hà Nội": [
    "Ba Đình",
    "Hoàn Kiếm",
    "Tây Hồ",
    "Long Biên",
    "Cầu Giấy",
    "Đống Đa",
    "Hai Bà Trưng",
    "Hoàng Mai",
    "Thanh Xuân",
    "Sóc Sơn",
    "Đông Anh",
    "Gia Lâm",
    "Nam Từ Liêm",
    "Thanh Trì",
    "Bắc Từ Liêm",
    "Mê Linh",
    "Hà Đông",
    "Sơn Tây",
    "Ba Vì",
    "Phúc Thọ",
    "Đan Phượng",
    "Hoài Đức",
    "Quốc Oai",
    "Thạch Thất",
    "Chương Mỹ",
    "Thanh Oai",
    "Thường Tín",
    "Phú Xuyên",
    "Ứng Hòa",
    "Mỹ Đức",
  ],
  "TP Hồ Chí Minh": [
    "Quận 1",
    "Quận 2",
    "Quận 3",
    "Quận 4",
    "Quận 5",
    "Quận 6",
    "Quận 7",
    "Quận 8",
    "Quận 9",
    "Quận 10",
    "Quận 11",
    "Quận 12",
    "Bình Tân",
    "Bình Thạnh",
    "Gò Vấp",
    "Phú Nhuận",
    "Tân Bình",
    "Tân Phú",
    "Thủ Đức",
    "Bình Chánh",
    "Cần Giờ",
    "Củ Chi",
    "Hóc Môn",
    "Nhà Bè",
  ],
  "Đà Nẵng": [
    "Hải Châu",
    "Cẩm Lệ",
    "Liên Chiểu",
    "Ngũ Hành Sơn",
    "Sơn Trà",
    "Thanh Khê",
    "Hòa Vang",
    "Hoàng Sa",
  ],
  "Hải Phòng": [
    "Hồng Bàng",
    "Lê Chân",
    "Ngô Quyền",
    "Kiến An",
    "Hải An",
    "Dương Kinh",
    "Đồ Sơn",
    "An Dương",
    "An Lão",
    "Bạch Long Vĩ",
    "Cát Hải",
    "Kiến Thụy",
    "Thủy Nguyên",
    "Tiên Lãng",
    "Vĩnh Bảo",
  ],
  "Cần Thơ": [
    "Ninh Kiều",
    "Ô Môn",
    "Bình Thủy",
    "Cái Răng",
    "Thốt Nốt",
    "Cờ Đỏ",
    "Phong Điền",
    "Thới Lai",
    "Vĩnh Thạnh",
  ],
  "Huế ": [
    "Huế",
    "Hương Thủy",
    "Hương Trà",
    "A Lưới",
    "Nam Đông",
    "Phong Điền",
    "Phú Lộc",
    "Phú Vang",
    "Quảng Điền",
  ],
  "Bà Rịa - Vũng Tàu": [
    "Vũng Tàu",
    "Bà Rịa",
    "Châu Đức",
    "Côn Đảo",
    "Đất Đỏ",
    "Long Điền",
    "Phú Mỹ",
    "Xuyên Mộc",
  ],
  "Bắc Giang": [
    "Bắc Giang",
    "Hiệp Hòa",
    "Lạng Giang",
    "Lục Nam",
    "Lục Ngạn",
    "Sơn Động",
    "Tân Yên",
    "Việt Yên",
    "Yên Dũng",
    "Yên Thế",
  ],
  "Bắc Kạn": [
    "Bắc Kạn",
    "Ba Bể",
    "Bạch Thông",
    "Chợ Đồn",
    "Chợ Mới",
    "Na Rì",
    "Ngân Sơn",
    "Pác Nặm",
  ],
  "Bạc Liêu": [
    "Bạc Liêu",
    "Đông Hải",
    "Giá Rai",
    "Hòa Bình",
    "Hồng Dân",
    "Phước Long",
    "Vĩnh Lợi",
  ],
  "Bắc Ninh": [
    "Bắc Ninh",
    "Gia Bình",
    "Lương Tài",
    "Quế Võ",
    "Thuận Thành",
    "Tiên Du",
    "Từ Sơn",
    "Yên Phong",
  ],
  "Bến Tre": [
    "Bến Tre",
    "Ba Tri",
    "Bình Đại",
    "Châu Thành",
    "Chợ Lách",
    "Giồng Trôm",
    "Mỏ Cày Bắc",
    "Mỏ Cày Nam",
    "Thạnh Phú",
  ],
  "Bình Định": [
    "Quy Nhơn",
    "An Lão",
    "An Nhơn",
    "Hoài Ân",
    "Hoài Nhơn",
    "Phù Cát",
    "Phù Mỹ",
    "Tây Sơn",
    "Tuy Phước",
    "Vân Canh",
    "Vĩnh Thạnh",
  ],
  "Bình Dương": [
    "Thủ Dầu Một",
    "Bàu Bàng",
    "Bến Cát",
    "Dầu Tiếng",
    "Dĩ An",
    "Phú Giáo",
    "Tân Uyên",
    "Thuận An",
  ],
  "Bình Phước": [
    "Đồng Xoài",
    "Bình Long",
    "Bù Đăng",
    "Bù Đốp",
    "Bù Gia Mập",
    "Chơn Thành",
    "Đồng Phú",
    "Hớn Quản",
    "Lộc Ninh",
    "Phú Riềng",
  ],
  "Bình Thuận": [
    "Phan Thiết",
    "La Gi",
    "Bắc Bình",
    "Đức Linh",
    "Hàm Tân",
    "Hàm Thuận Bắc",
    "Hàm Thuận Nam",
    "Phú Quý",
    "Tánh Linh",
    "Tuy Phong",
  ],
  "Cà Mau": [
    "Cà Mau",
    "Cái Nước",
    "Đầm Dơi",
    "Năm Căn",
    "Ngọc Hiển",
    "Phú Tân",
    "Thới Bình",
    "Trần Văn Thời",
    "U Minh",
  ],
  "Cao Bằng": [
    "Cao Bằng",
    "Bảo Lạc",
    "Bảo Lâm",
    "Hà Quảng",
    "Hạ Lang",
    "Hòa An",
    "Nguyên Bình",
    "Phục Hòa",
    "Quảng Uyên",
    "Thạch An",
    "Thông Nông",
    "Trà Lĩnh",
    "Trùng Khánh",
  ],
  "Đắk Lắk": [
    "Buôn Ma Thuột",
    "Buôn Đôn",
    "Cư Kuin",
    "Cư M'gar",
    "Ea H'leo",
    "Ea Kar",
    "Ea Súp",
    "Krông Ana",
    "Krông Bông",
    "Krông Búk",
    "Krông Năng",
    "Krông Pắk",
    "Lắk",
    "M'Đrắk",
  ],
  "Đắk Nông": [
    "Gia Nghĩa",
    "Cư Jút",
    "Đắk Glong",
    "Đắk Mil",
    "Đắk R'Lấp",
    "Đắk Song",
    "Krông Nô",
    "Tuy Đức",
  ],
  "Điện Biên": [
    "Điện Biên Phủ",
    "Mường Lay",
    "Điện Biên",
    "Điện Biên Đông",
    "Mường Ảng",
    "Mường Chà",
    "Mường Nhé",
    "Nậm Pồ",
    "Tủa Chùa",
    "Tuần Giáo",
  ],
  "Đồng Nai": [
    "Biên Hòa",
    "Long Khánh",
    "Cẩm Mỹ",
    "Định Quán",
    "Long Thành",
    "Nhơn Trạch",
    "Tân Phú",
    "Thống Nhất",
    "Trảng Bom",
    "Vĩnh Cửu",
    "Xuân Lộc",
  ],
  "Đồng Tháp": [
    "Cao Lãnh",
    "Sa Đéc",
    "Hồng Ngự",
    "Châu Thành",
    "Hồng Ngự",
    "Lai Vung",
    "Lấp Vò",
    "Tam Nông",
    "Tân Hồng",
    "Thanh Bình",
    "Tháp Mười",
  ],
  "Gia Lai": [
    "Pleiku",
    "An Khê",
    "Ayun Pa",
    "Chư Păh",
    "Chư Prông",
    "Chư Pưh",
    "Chư Sê",
    "Đăk Đoa",
    "Đăk Pơ",
    "Đức Cơ",
    "Ia Grai",
    "Ia Pa",
    "KBang",
    "Kông Chro",
    "Krông Pa",
    "Mang Yang",
    "Phú Thiện",
  ],
  "Hà Giang": [
    "Hà Giang",
    "Bắc Mê",
    "Bắc Quang",
    "Đồng Văn",
    "Hoàng Su Phì",
    "Mèo Vạc",
    "Quản Bạ",
    "Quang Bình",
    "Vị Xuyên",
    "Xín Mần",
    "Yên Minh",
  ],
  "Hà Nam": [
    "Phủ Lý",
    "Bình Lục",
    "Duy Tiên",
    "Kim Bảng",
    "Lý Nhân",
    "Thanh Liêm",
  ],
  "Hà Tĩnh": [
    "Hà Tĩnh",
    "Hồng Lĩnh",
    "Kỳ Anh",
    "Vũng Áng",
    "Cẩm Xuyên",
    "Can Lộc",
    "Đức Thọ",
    "Hương Khê",
    "Hương Sơn",
    "Kỳ Anh",
    "Lộc Hà",
    "Nghi Xuân",
    "Thạch Hà",
    "Vũ Quang",
  ],
  "Hải Dương": [
    "Hải Dương",
    "Chí Linh",
    "Bình Giang",
    "Cẩm Giàng",
    "Gia Lộc",
    "Kim Thành",
    "Kinh Môn",
    "Nam Sách",
    "Ninh Giang",
    "Thanh Hà",
    "Thanh Miện",
    "Tứ Kỳ",
  ],
  "Hậu Giang": [
    "Vị Thanh",
    "Ngã Bảy",
    "Long Mỹ",
    "Long Mỹ",
    "Châu Thành",
    "Châu Thành A",
    "Phụng Hiệp",
    "Vị Thủy",
  ],
  "Hòa Bình": [
    "Hòa Bình",
    "Cao Phong",
    "Đà Bắc",
    "Kim Bôi",
    "Kỳ Sơn",
    "Lạc Sơn",
    "Lạc Thủy",
    "Lương Sơn",
    "Mai Châu",
    "Tân Lạc",
    "Yên Thủy",
  ],
  "Hưng Yên": [
    "Hưng Yên",
    "Ân Thi",
    "Khoái Châu",
    "Kim Động",
    "Mỹ Hào",
    "Phù Cừ",
    "Tiên Lữ",
    "Văn Giang",
    "Văn Lâm",
    "Yên Mỹ",
  ],
  "Khánh Hòa": [
    "Nha Trang",
    "Cam Ranh",
    "Cam Lâm",
    "Diên Khánh",
    "Khánh Sơn",
    "Khánh Vĩnh",
    "Ninh Hòa",
    "Trường Sa",
    "Vạn Ninh",
  ],
  "Kiên Giang": [
    "Rạch Giá",
    "Hà Tiên",
    "An Biên",
    "An Minh",
    "Châu Thành",
    "Giang Thành",
    "Giồng Riềng",
    "Gò Quao",
    "Hòn Đất",
    "Kiên Hải",
    "Kiên Lương",
    "Phú Quốc",
    "Tân Hiệp",
    "U Minh Thượng",
    "Vĩnh Thuận",
  ],
  "Kon Tum": [
    "Kon Tum",
    "Đắk Glei",
    "Đắk Hà",
    "Đắk Tô",
    "Ia H'Drai",
    "Kon Plông",
    "Kon Rẫy",
    "Ngọc Hồi",
    "Sa Thầy",
    "Tu Mơ Rông",
  ],
  "Lai Châu": [
    "Lai Châu",
    "Mường Tè",
    "Nậm Nhùn",
    "Phong Thổ",
    "Sìn Hồ",
    "Tam Đường",
    "Tân Uyên",
    "Than Uyên",
  ],
  "Lâm Đồng": [
    "Đà Lạt",
    "Bảo Lộc",
    "Bảo Lâm",
    "Cát Tiên",
    "Đạ Huoai",
    "Đạ Tẻh",
    "Đam Rông",
    "Di Linh",
    "Đơn Dương",
    "Đức Trọng",
    "Lạc Dương",
    "Lâm Hà",
  ],
  "Lạng Sơn": [
    "Lạng Sơn",
    "Bắc Sơn",
    "Bình Gia",
    "Cao Lộc",
    "Chi Lăng",
    "Đình Lập",
    "Hữu Lũng",
    "Lộc Bình",
    "Tràng Định",
    "Văn Lãng",
    "Văn Quan",
  ],
  "Lào Cai": [
    "Lào Cai",
    "Bát Xát",
    "Bảo Thắng",
    "Bảo Yên",
    "Bắc Hà",
    "Mường Khương",
    "Sa Pa",
    "Si Ma Cai",
    "Văn Bàn",
  ],
  "Long An": [
    "Tân An",
    "Bến Lức",
    "Cần Đước",
    "Cần Giuộc",
    "Châu Thành",
    "Đức Hòa",
    "Đức Huệ",
    "Mộc Hóa",
    "Tân Hưng",
    "Tân Thạnh",
    "Tân Trụ",
    "Thạnh Hóa",
    "Thủ Thừa",
    "Vĩnh Hưng",
  ],
  "Nam Định": [
    "Nam Định",
    "Giao Thủy",
    "Hải Hậu",
    "Mỹ Lộc",
    "Nam Trực",
    "Nghĩa Hưng",
    "Trực Ninh",
    "Vụ Bản",
    "Xuân Trường",
    "Ý Yên",
  ],
  "Nghệ An": [
    "Vinh",
    "Cửa Lò",
    "Hoàng Mai",
    "Thái Hòa",
    "Anh Sơn",
    "Con Cuông",
    "Diễn Châu",
    "Đô Lương",
    "Hưng Nguyên",
    "Kỳ Sơn",
    "Nam Đàn",
    "Nghi Lộc",
    "Nghĩa Đàn",
    "Quế Phong",
    "Quỳ Châu",
    "Quỳ Hợp",
    "Quỳnh Lưu",
    "Tân Kỳ",
    "Thanh Chương",
    "Tương Dương",
    "Yên Thành",
  ],
  "Ninh Bình": [
    "Ninh Bình",
    "Tam Điệp",
    "Gia Viễn",
    "Hoa Lư",
    "Kim Sơn",
    "Nho Quan",
    "Yên Khánh",
    "Yên Mô",
  ],
  "Ninh Thuận": [
    "Phan Rang - Tháp Chàm",
    "Bác Ái",
    "Ninh Hải",
    "Ninh Phước",
    "Ninh Sơn",
    "Thuận Bắc",
    "Thuận Nam",
  ],
  "Phú Thọ": [
    "Việt Trì",
    "Phú Thọ",
    "Cẩm Khê",
    "Đoan Hùng",
    "Hạ Hòa",
    "Lâm Thao",
    "Phù Ninh",
    "Tam Nông",
    "Tân Sơn",
    "Thanh Ba",
    "Thanh Sơn",
    "Thanh Thủy",
    "Yên Lập",
  ],
  "Phú Yên": [
    "Tuy Hòa",
    "Sông Cầu",
    "Đông Hòa",
    "Đồng Xuân",
    "Phú Hòa",
    "Sơn Hòa",
    "Sông Hinh",
    "Tây Hòa",
    "Tuy An",
  ],
  "Quảng Bình": [
    "Đồng Hới",
    "Ba Đồn",
    "Bố Trạch",
    "Lệ Thủy",
    "Minh Hóa",
    "Quảng Ninh",
    "Quảng Trạch",
    "Tuyên Hóa",
  ],
  "Quảng Nam": [
    "Tam Kỳ",
    "Hội An",
    "Điện Bàn",
    "Đại Lộc",
    "Đông Giang",
    "Duy Xuyên",
    "Hiệp Đức",
    "Nam Giang",
    "Nam Trà My",
    "Nông Sơn",
    "Núi Thành",
    "Phú Ninh",
    "Phước Sơn",
    "Quế Sơn",
    "Tây Giang",
    "Thăng Bình",
    "Tiên Phước",
  ],
  "Quảng Ngãi": [
    "Quảng Ngãi",
    "Ba Tơ",
    "Bình Sơn",
    "Đức Phổ",
    "Lý Sơn",
    "Minh Long",
    "Mộ Đức",
    "Nghĩa Hành",
    "Sơn Hà",
    "Sơn Tây",
    "Sơn Tịnh",
    "Tây Trà",
    "Trà Bồng",
    "Tư Nghĩa",
  ],
  "Quảng Ninh": [
    "Hạ Long",
    "Cẩm Phả",
    "Móng Cái",
    "Uông Bí",
    "Bình Liêu",
    "Ba Chẽ",
    "Cô Tô",
    "Đầm Hà",
    "Đông Triều",
    "Hải Hà",
    "Hoành Bồ",
    "Quảng Yên",
    "Tiên Yên",
    "Vân Đồn",
  ],
  "Quảng Trị": [
    "Đông Hà",
    "Quảng Trị",
    "Cam Lộ",
    "Cồn Cỏ",
    "Đăk Rông",
    "Gio Linh",
    "Hải Lăng",
    "Hướng Hóa",
    "Triệu Phong",
    "Vĩnh Linh",
  ],
  "Sóc Trăng": [
    "Sóc Trăng",
    "Châu Thành",
    "Cù Lao Dung",
    "Kế Sách",
    "Long Phú",
    "Mỹ Tú",
    "Mỹ Xuyên",
    "Ngã Năm",
    "Thạnh Trị",
    "Trần Đề",
    "Vĩnh Châu",
  ],
  "Sơn La": [
    "Sơn La",
    "Bắc Yên",
    "Mai Sơn",
    "Mộc Châu",
    "Mường La",
    "Phù Yên",
    "Quỳnh Nhai",
    "Sông Mã",
    "Sốp Cộp",
    "Thuận Châu",
    "Vân Hồ",
    "Yên Châu",
  ],
  "Tây Ninh": [
    "Tây Ninh",
    "Bến Cầu",
    "Châu Thành",
    "Dương Minh Châu",
    "Gò Dầu",
    "Hòa Thành",
    "Tân Biên",
    "Tân Châu",
    "Trảng Bàng",
  ],
  "Thái Bình": [
    "Thái Bình",
    "Đông Hưng",
    "Hưng Hà",
    "Kiến Xương",
    "Quỳnh Phụ",
    "Thái Thụy",
    "Tiền Hải",
    "Vũ Thư",
  ],
  "Thái Nguyên": [
    "Thái Nguyên",
    "Sông Công",
    "Phổ Yên",
    "Đại Từ",
    "Định Hóa",
    "Đồng Hỷ",
    "Phú Bình",
    "Phú Lương",
    "Võ Nhai",
  ],
  "Thanh Hóa": [
    "Thanh Hóa",
    "Bỉm Sơn",
    "Sầm Sơn",
    "Bá Thước",
    "Cẩm Thủy",
    "Đông Sơn",
    "Hà Trung",
    "Hậu Lộc",
    "Hoằng Hóa",
    "Lang Chánh",
    "Mường Lát",
    "Nga Sơn",
    "Ngọc Lặc",
    "Như Thanh",
    "Như Xuân",
    "Nông Cống",
    "Quan Hóa",
    "Quan Sơn",
    "Quảng Xương",
    "Thạch Thành",
    "Thiệu Hóa",
    "Thọ Xuân",
    "Thường Xuân",
    "Triệu Sơn",
    "Vĩnh Lộc",
    "Yên Định",
  ],
  "Thừa Thiên - Huế": [
    "Huế",
    "Hương Thủy",
    "Hương Trà",
    "A Lưới",
    "Nam Đông",
    "Phong Điền",
    "Phú Lộc",
    "Phú Vang",
    "Quảng Điền",
  ],
  "Tiền Giang": [
    "Mỹ Tho",
    "Cai Lậy",
    "Gò Công",
    "Cái Bè",
    "Châu Thành",
    "Chợ Gạo",
    "Gò Công Đông",
    "Gò Công Tây",
    "Tân Phú Đông",
    "Tân Phước",
  ],
  "Trà Vinh": [
    "Trà Vinh",
    "Càng Long",
    "Cầu Kè",
    "Cầu Ngang",
    "Châu Thành",
    "Duyên Hải",
    "Tiểu Cần",
    "Trà Cú",
  ],
  "Tuyên Quang": [
    "Tuyên Quang",
    "Chiêm Hóa",
    "Hàm Yên",
    "Lâm Bình",
    "Na Hang",
    "Sơn Dương",
    "Yên Sơn",
  ],
  "Vĩnh Long": [
    "Vĩnh Long",
    "Bình Minh",
    "Bình Tân",
    "Long Hồ",
    "Mang Thít",
    "Tam Bình",
    "Trà Ôn",
    "Vũng Liêm",
  ],
  "Vĩnh Phúc": [
    "Vĩnh Yên",
    "Phúc Yên",
    "Bình Xuyên",
    "Lập Thạch",
    "Sông Lô",
    "Tam Đảo",
    "Tam Dương",
    "Vĩnh Tường",
    "Yên Lạc",
  ],
  "Yên Bái": [
    "Yên Bái",
    "Nghĩa Lộ",
    "Lục Yên",
    "Mù Cang Chải",
    "Trạm Tấu",
    "Trấn Yên",
    "Văn Chấn",
    "Văn Yên",
    "Yên Bình",
  ],
};

const ClubForms = ({ open, onClose, onSubmit, fetFunction, mode, clubid }) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [districts, setDistricts] = useState([]);
  const selectedCity = watch("city");
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    if (mode === "update" && clubid) {
      //viet cu phap update du lieu tu DB len
    }
  }, [mode, clubid]);

  // hiển thị quận huyện tương ứng với city
  useEffect(() => {
    if (selectedCity) {
      setDistricts(data[selectedCity]);
      setValue("district", "");
    }
  }, [selectedCity, setValue]);

  const handleFormSubmit = async (data) => {
    const uploadPromises = fileList.map(async (file) => {
      const downloadURL = await uploadFile(file.originFileObj);
      return downloadURL;
    });
    const uploadedUrls = await Promise.all(uploadPromises);

    const peakHourRequests = [
      {
        startTime: parseInt(data.starTimePeakHours, 10),
        endTime: parseInt(data.endTimePeakHours, 10),
        peakPrice: parseInt(data.courtPricePeakHours, 10),
      },
    ];

    const adjustedData = {
      ...data,
      openingTime: parseInt(data.openingTime, 10),
      closingTime: parseInt(data.closingTime, 10),
      peakHourRequests: peakHourRequests,
      urlImages: uploadedUrls,
    };

    try {
      if (mode === "create") {
        await api.post("/club", adjustedData);
      } else if (mode === "update") {
        // cu phap cho submit cho update
      }
      onSubmit(adjustedData);
      fetFunction();
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };

  const handleChange = ({ fileList }) => setFileList(fileList);

  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewOpen(true);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  // const handleTimeChange = (event) => {
  //   const inputTime = event.target.value;
  //   const hour = inputTime.split(":")[0];
  //   const adjustedTime = `${hour}:00`;
  //   control.setValue("openingTime", adjustedTime);
  // };

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
        {mode === "create" ? "Tạo Mới Club" : "Cập Nhật Club"}
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
          <FormControl fullWidth margin="normal" error={!!errors.clubName}>
            <TextField
              label="Tên Club"
              {...control.register("clubName")}
              error={!!errors.clubName}
              helperText={errors.clubName?.message}
            />
          </FormControl>

          <FormControl
            fullWidth
            margin="normal"
            error={!!errors.clubDescription}
          >
            <TextField
              label="Mô tả"
              {...control.register("clubDescription")}
              fullWidth
              margin="normal"
              multiline
              rows={4}
              error={!!errors.clubDescription}
              helperText={errors.clubDescription?.message}
            />
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.clubHotLine}>
            <TextField
              label="Số Hotline"
              {...control.register("clubHotLine")}
              fullWidth
              margin="normal"
              error={!!errors.clubHotLine}
              helperText={errors.clubHotLine?.message}
            />
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.capacity}>
            <TextField
              label="Số lượng sân dự kiến"
              type="number"
              {...control.register("capacity")}
              fullWidth
              margin="normal"
              error={!!errors.capacity}
              helperText={errors.capacity?.message}
              onInput={(e) => {
                e.target.value = Math.max(1, parseInt(e.target.value) || 1);
              }}
            />
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.openingTime}>
            <TextField
              label="Giờ mở cửa"
              type="time"
              {...control.register("openingTime", { value: "" })}
              fullWidth
              margin="normal"
              error={!!errors.openingTime}
              helperText={errors.openingTime?.message}
            />

            {/* <TextField
              label="Giờ mở cửa"
              {...control.register("openingTime")}
              fullWidth
              margin="normal"
              error={!!errors.openingTime}
              helperText={errors.openingTime?.message}
              type="time"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                inputProps: {
                  step: 3600,
                },
              }}
              onChange={handleTimeChange}
            /> */}
          </FormControl>

          {/* <FormControl fullWidth margin="normal" error={!!errors.closingTime}>
            <TextField
              label="Giờ đóng cửa"
              {...control.register("closingTime")}
              fullWidth
              margin="normal"
              error={!!errors.closingTime}
              helperText={errors.closingTime?.message}
              type="time"
            />
          </FormControl>  */}

          <FormControl fullWidth margin="normal" error={!!errors.closingTime}>
            <Controller
              name="closingTime"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Giờ đóng cửa"
                  fullWidth
                  margin="normal"
                  type="time"
                  error={!!errors.closingTime}
                  helperText={errors.closingTime?.message}
                />
              )}
            />
          </FormControl>

          <FormControl
            fullWidth
            margin="normal"
            error={!!errors.starTimePeakHours}
          >
            <TextField
              label="Bắt đầu giờ cao điểm"
              {...control.register("starTimePeakHours")}
              fullWidth
              margin="normal"
              error={!!errors.starTimePeakHours}
              helperText={errors.starTimePeakHours?.message}
              type="time"
            />
          </FormControl>

          <FormControl
            fullWidth
            margin="normal"
            error={!!errors.endTimePeakHours}
          >
            <TextField
              label="Kết thúc giờ cao điểm"
              {...control.register("endTimePeakHours")}
              fullWidth
              margin="normal"
              error={!!errors.endTimePeakHours}
              helperText={errors.endTimePeakHours?.message}
              type="time"
            />
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.courtPrice}>
            <TextField
              label="Giá sân"
              {...control.register("courtPrice")}
              fullWidth
              margin="normal"
              error={!!errors.courtPrice}
              helperText={errors.courtPrice?.message}
              onInput={(e) => {
                e.target.value = Math.max(1, parseInt(e.target.value) || 1);
              }}
            />
          </FormControl>

          <FormControl
            fullWidth
            margin="normal"
            error={!!errors.courtPricePeakHours}
          >
            <TextField
              label="Giá sân giờ cao điểm"
              {...control.register("courtPricePeakHours")}
              fullWidth
              margin="normal"
              error={!!errors.courtPricePeakHours}
              helperText={errors.courtPricePeakHours?.message}
              onInput={(e) => {
                e.target.value = Math.max(1, parseInt(e.target.value) || 1);
              }}
            />
          </FormControl>

          <FormControl
            fullWidth
            margin="normal"
            error={!!errors.flexiblePercent}
          >
            <Controller
              name="flexiblePercent"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Giảm giá cho đặt lịch linh hoạt (%)"
                  fullWidth
                  margin="normal"
                  error={!!errors.flexiblePercent}
                  helperText={errors.flexiblePercent?.message}
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.fixedPercent}>
            <Controller
              name="fixedPercent"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Giảm giá cho đặt lịch cố định (%)"
                  fullWidth
                  margin="normal"
                  error={!!errors.fixedPercent}
                  helperText={errors.fixedPercent?.message}
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.city}>
            <InputLabel>Tỉnh / Thành phố</InputLabel>
            <Select
              {...control.register("city")}
              fullWidth
              margin="normal"
              error={!!errors.city}
            >
              {Object.keys(data).map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.city?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.district}>
            <InputLabel>Quận / Huyện</InputLabel>
            <Select
              {...control.register("district")}
              fullWidth
              margin="normal"
              error={!!errors.district}
            >
              {districts.map((district) => (
                <MenuItem key={district} value={district}>
                  {district}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.district?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.clubAddress}>
            <TextField
              label="Địa chỉ"
              {...control.register("clubAddress")}
              fullWidth
              margin="normal"
              error={!!errors.clubAddress}
              helperText={errors.clubAddress?.message}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </FormControl>

          <DialogActions>
            <Button
              onClick={onClose}
              sx={{
                color: colors.redAccent[500],
              }}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              sx={{
                color: colors.greenAccent[500],
              }}
            >
              {mode === "create" ? "Tạo" : "Cập nhật"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>

      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </Dialog>
  );
};

export default ClubForms;

import { useEffect, useState } from "react";
import "./index.scss";
import api from "../../config/axios";

const UpdateAccount = ({ id }) => {
  const [formData, setFormData] = useState({
    account_status: "",
    avatar: "",
    email: "",
    gender: "",
    name: "",
    phone: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  async function fetchAccounts() {
    try {
      const response = await api.get(`/account/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching account data:", error);
    }
  }

  useEffect(() => {
    if (id) {
      fetchAccounts();
    }
  }, [id]);

  return (
    <form className="update-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="avatar">Ảnh đại diện</label>
        <input
          type="text"
          id="avatar"
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
        />
        {formData.avatar && (
          <img
            src={formData.avatar}
            alt="Avatar Preview"
            className="avatar-preview"
          />
        )}
      </div>
      <div className="form-group">
        <label htmlFor="name">Tên</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Mật khẩu</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Số điện thoại</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="gender">Giới tính</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Chọn giới tính</option>
            <option value="MALE">Nam</option>
            <option value="FEMALE">Nữ</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="role">Chức vụ</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Chọn chức vụ</option>
            <option value="ADMIN">ADMIN</option>
            <option value="CUSTOMER">CUSTOMER</option>
            <option value="CLUB_OWNER">CLUB_OWNER</option>
            <option value="CLUB_STAFF">CLUB_STAFF</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="account_status">Trạng thái</label>
          <select
            id="account_status"
            name="account_status"
            value={formData.account_status}
            onChange={handleChange}
          >
            <option value="">Chọn trạng thái</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
        </div>
      </div>
      <button type="submit">Cập nhật</button>
    </form>
  );
};

export default UpdateAccount;

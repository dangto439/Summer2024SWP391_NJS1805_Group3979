import React, { useState, useEffect } from "react";
import { Input } from "antd";

const CurrencyInput = ({ value = "", onChange, ...props }) => {
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    setDisplayValue(formatCurrency(value));
  }, [value]);

  const formatCurrency = (value) => {
    if (!value) return "";
    const cleanedValue = value.toString().replace(/\D/g, "");
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(cleanedValue);
  };

  const handleChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, "");
    setDisplayValue(formatCurrency(inputValue));
    if (onChange) {
      onChange(inputValue);
    }
  };

  return <Input {...props} value={displayValue} onChange={handleChange} />;
};

export default CurrencyInput;

import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Bracket } from "react-brackets";
import axios from "axios";

const Tournament = () => {
  const [rounds, setRounds] = useState([
    {
      title: "Vòng loại 1",
      seeds: [
        {
          id: 1,
          date: new Date().toDateString(),
          teams: [{ name: "Đội A" }, { name: "Đội B" }],
        },
        {
          id: 2,
          date: new Date().toDateString(),
          teams: [{ name: "Đội C" }, { name: "Đội D" }],
        },
        {
          id: 3,
          date: new Date().toDateString(),
          teams: [{ name: "Đội E" }, { name: "Đội F" }],
        },
        {
          id: 4,
          date: new Date().toDateString(),
          teams: [{ name: "Đội G" }, { name: "Đội H" }],
        },
        {
          id: 5,
          date: new Date().toDateString(),
          teams: [{ name: "Đội I" }, { name: "Đội J" }],
        },
        {
          id: 6,
          date: new Date().toDateString(),
          teams: [{ name: "Đội K" }, { name: "Đội L" }],
        },
        {
          id: 7,
          date: new Date().toDateString(),
          teams: [{ name: "Đội M" }, { name: "Đội N" }],
        },
        {
          id: 8,
          date: new Date().toDateString(),
          teams: [{ name: "Đội O" }, { name: "Đội P" }],
        },
      ],
    },
    {
      title: "Vòng loại 2",
      seeds: [
        {
          id: 9,
          date: new Date().toDateString(),
          teams: [{ name: "Winner 1" }, { name: "Winner 2" }],
        },
        {
          id: 10,
          date: new Date().toDateString(),
          teams: [{ name: "Winner 1" }, { name: "Winner 2" }],
        },
        {
          id: 11,
          date: new Date().toDateString(),
          teams: [{ name: "Winner 1" }, { name: "Winner 2" }],
        },
        {
          id: 12,
          date: new Date().toDateString(),
          teams: [{ name: "Winner 1" }, { name: "Winner 2" }],
        },
      ],
    },
    {
      title: "Bán kết",
      seeds: [
        {
          id: 13,
          date: new Date().toDateString(),
          teams: [{ name: "Winner 1" }, { name: "Winner 2" }],
        },
        {
          id: 14,
          date: new Date().toDateString(),
          teams: [{ name: "Winner 1" }, { name: "Winner 2" }],
        },
      ],
    },
    {
      title: "Chung kết",
      seeds: [
        {
          id: 15,
          date: new Date().toDateString(),
          teams: [{ name: "Winner 1" }, { name: "Winner 2" }],
        },
      ],
    },
  ]);

  //Mặc định hiển thị với dữ liệu ở trên, khi dữ liệu trong api có tồn tại thì sẽ cập nhật lại sau
  useEffect(() => {
    const fetchRounds = async () => {
      try {
        //đang gỉa sử link api
        const response = await axios.get("/rounds");
        if (response.data && Array.isArray(response.data)) {
          const updatedRounds = rounds.map((round, index) => {
            return response.data[index] ? response.data[index] : round;
          });
          setRounds(updatedRounds);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchRounds();
  }, []);

  return (
    <Box p={5} mx="auto" maxWidth="80%" display="flex" justifyContent="center">
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Bracket
          rounds={rounds}
          roundTitleComponent={(title) => (
            <div
              style={{
                textAlign: "center",
                backgroundColor: "blue",
                color: "white",
                padding: "5px",
                borderRadius: "5px",
                marginBottom: "10px",
                margin: "0 20px",
              }}
            >
              {title}
            </div>
          )}
        />
      </div>
    </Box>
  );
};

export default Tournament;

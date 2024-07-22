import { AiOutlineBuild, AiOutlineDollarCircle } from "react-icons/ai";
import { MdSupervisorAccount } from "react-icons/md";
import { GiTennisCourt } from "react-icons/gi";

import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  LineChart,
  Customized,
  AreaChart,
} from "recharts";
import "./index.scss";
import { useEffect, useState } from "react";
import api from "../../config/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import ViewTransaction from "../viewtransaction/viewtransaction";
import { DatePicker } from "antd";
import moment from "moment/moment";

function AdminDasboard() {
  const user = useSelector(selectUser); // lấy account hiện tại từ redux;
  const [isCheck, setCheck] = useState(false);
  const [year, setYear] = useState(moment().year());
  const [month, setMonth] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);
  const [accountNumber, setAccountNumber] = useState(0);
  const [clubNumber, setClubNumber] = useState(0);
  const [courtNumber, setCourtNumber] = useState(0);
  const [simpleAreaChart, SetSimpleAreaChart] = useState([]);
  const [simpleBarChart, SetSimpleBarChart] = useState([]);
  const [simpleTinyChart, SetSimpleTinyChart] = useState([]);
  const [transaction, setTransaction] = useState([]);

  const onChangeYear = (date, dateString) => {
    setMonth(0);
    setYear(dateString);
  };

  const onChangeMonth = (date, dateString) => {
    setMonth(date.$M + 1);
    setYear(date.$y);
  };

  const fetchData = async () => {
    try {
      const [
        totalPriceResponse,
        transactionResponse,
        accountsResponse,
        clubsResponse,
        CoursResponse,
        simpleAreaChartResponseByYear,
        simpleAreaChartResponseByYearandMonth,
        simpleBarChartResponseByYear,
        simpleTinyChartResponseByYear,
      ] = await Promise.all([
        api.get(`/wallet/${user.id}`),
        api.get(`get-transactions/${user.id}`),
        api.get(`/get-all-account`),
        api.get(`/clubs`),
        api.get(`/get-all-court`),
        api.get(`/dashboard-admin-area-chart/${year}`),
        api.get(`/dashboard-admin-area-chart/${year}/${month}`),
        api.get(`/dashboard-admin-bar-chart/${year}`),
        api.get(`/dashboard-admin-tiny-chart/${year}`),
      ]);

      setTotalPrice(totalPriceResponse.data.balance);
      setAccountNumber(accountsResponse.data.length - 1);
      setClubNumber(clubsResponse.data.length);
      setCourtNumber(CoursResponse.data.length);
      setTransaction(transactionResponse.data);
      if (transactionResponse.data.length > 0) {
        setCheck(true);
      } else {
        setCheck(false);
      }

      if (month == 0) {
        const transformedData = simpleAreaChartResponseByYear.data.map(
          (item) => ({
            name: `Tháng ${item.month}`,
            tienvao: item.sumamount,
          })
        );
        SetSimpleAreaChart(transformedData);
      } else {
        const transformedData = simpleAreaChartResponseByYearandMonth.data.map(
          (item) => ({
            name: `Tuần ${item.month}`,
            tienvao: item.sumamount,
          })
        );
        SetSimpleAreaChart(transformedData);
      }

      const transformedData1 = simpleBarChartResponseByYear.data.map(
        (item) => ({
          name: `Tháng ${item.month}`,
          TongGiaBooking: item.sumamount,
        })
      );
      SetSimpleBarChart(transformedData1);

      const transformedData2 = simpleTinyChartResponseByYear.data.map(
        (item) => ({
          name: `Tháng ${item.month}`,
          soluongaccount: item.sumamount,
        })
      );
      SetSimpleTinyChart(transformedData2);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [year, month]);
  return (
    <main className="main-container-admin">
      <div className="main-ttile">
        <h3>Admin</h3>
      </div>

      <div className="main_cards">
        <div className="card blue">
          <div className="card_inner ">
            <h3>Người dùng</h3>
            <MdSupervisorAccount className="card_icon" />
          </div>
          <h1>{accountNumber}</h1>
        </div>
        <div className="card orange">
          <div className="card_inner">
            <h3>Câu lạc bộ</h3>
            <AiOutlineBuild className="card_icon" />
          </div>
          <h1>{clubNumber}</h1>
        </div>
        <div className="card purple">
          <div className="card_inner">
            <h3>Sân</h3>
            <GiTennisCourt className="card_icon" />
          </div>
          <h1>{courtNumber}</h1>
        </div>
        <div className="card red">
          <div className="card_inner ">
            <h3>Tổng tiền</h3>
            <AiOutlineDollarCircle className="card_icon" />
          </div>
          <h1>{totalPrice} VND</h1>
        </div>
        {/* <div>
          <DatePicker onChange={onChangeYear} picker="year" />
          <DatePicker onChange={onChangeMonth} picker="month" />
        </div> */}
        <div className="charts">
          <ResponsiveContainer width="100%" height={500}>
            <AreaChart
              width={500}
              height={400}
              data={simpleAreaChart}
              margin={{
                top: 10,
                right: 30,
                left: 30,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="tienvao"
                stroke="#ff0000"
                fill="#ff0000"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="charts">
          <ResponsiveContainer width="100%" height={600}>
            <BarChart
              width={500}
              height={300}
              data={simpleBarChart}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="TongGiaBooking"
                fill="#82ca9d"
                activeBar={<Rectangle fill="gold" stroke="purple" />}
              />
            </BarChart>
          </ResponsiveContainer>
          {/* <ResponsiveContainer width="100%" height={600}>
            <ComposedChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" scale="band" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="amt"
                fill="#8884d8"
                stroke="#8884d8"
              />
              <Bar dataKey="priceout" barSize={20} fill="#413ea0" />
              <Line type="monotone" dataKey="pricein" stroke="#ff7300" />
            </ComposedChart>
          </ResponsiveContainer> */}
          <ResponsiveContainer width="100%" height={600}>
            <BarChart
              width={500}
              height={300}
              data={simpleTinyChart}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="soluongaccount"
                fill="#82ca9d"
                activeBar={<Rectangle fill="gold" stroke="purple" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div>{isCheck ? <ViewTransaction data={transaction} /> : null}</div>
    </main>
  );
}

export default AdminDasboard;

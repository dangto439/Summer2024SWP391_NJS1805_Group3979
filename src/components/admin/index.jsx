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
} from "recharts";
import "./index.scss";

function AdminDasboard() {
  const data = [
    {
      name: "Tháng  1",
      pricein: 4000,
      priceout: 2400,
      amt: 2400,
    },
    {
      name: "Tháng  2",
      pricein: 3000,
      priceout: 1398,
      amt: 2210,
    },
    {
      name: "Tháng  3",
      pricein: 2000,
      priceout: 9800,
      amt: 2290,
    },
    {
      name: "Tháng  4",
      pricein: 2780,
      priceout: 3908,
      amt: 2000,
    },
    {
      name: "Tháng  5",
      pricein: 1890,
      priceout: 4800,
      amt: 2181,
    },
    {
      name: "Tháng  6",
      pricein: 2390,
      priceout: 3800,
      amt: 2500,
    },
    {
      name: "Tháng  7",
      pricein: 3490,
      priceout: 4300,
      amt: 2100,
    },
  ];

  const CustomizedRectangle = (props) => {
    const { formattedGraphicalItems } = props;
    // get first and second series in chart
    const firstSeries = formattedGraphicalItems[0];
    const secondSeries = formattedGraphicalItems[1];

    // render custom content using points from the graph
    return firstSeries?.props?.points.map((firstSeriesPoint, index) => {
      const secondSeriesPoint = secondSeries?.props?.points[index];
      const yDifference = firstSeriesPoint.y - secondSeriesPoint.y;

      return (
        <Rectangle
          key={firstSeriesPoint.payload.name}
          width={10}
          height={yDifference}
          x={secondSeriesPoint.x - 5}
          y={secondSeriesPoint.y}
          fill={yDifference > 0 ? "red" : yDifference < 0 ? "green" : "none"}
        />
      );
    });
  };
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
          <h1>300</h1>
        </div>
        <div className="card orange">
          <div className="card_inner">
            <h3>Câu lạc bộ</h3>
            <AiOutlineBuild className="card_icon" />
          </div>
          <h1>50</h1>
        </div>
        <div className="card purple">
          <div className="card_inner">
            <h3>Sân</h3>
            <GiTennisCourt className="card_icon" />
          </div>
          <h1>340</h1>
        </div>
        <div className="card red">
          <div className="card_inner ">
            <h3>Doanh thu</h3>
            <AiOutlineDollarCircle className="card_icon" />
          </div>
          <h1>5000 VND</h1>
        </div>
        <div className="charts">
          <ResponsiveContainer width="100%" height={500}>
            <LineChart
              width={500}
              height={300}
              data={data}
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
              <Line type="monotone" dataKey="priceout" stroke="#8884d8" />
              <Line type="monotone" dataKey="pricein" stroke="#82ca9d" />
              <Customized component={CustomizedRectangle} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="charts">
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              width={500}
              height={300}
              data={data}
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
                dataKey="priceout"
                fill="#8884d8"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
              <Bar
                dataKey="pricein"
                fill="#82ca9d"
                activeBar={<Rectangle fill="gold" stroke="purple" />}
              />
            </BarChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height={500}>
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
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}

export default AdminDasboard;

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Calendar } from "lucide-react";
import "./StatsChart.css";

const dataMap = {
  Weekly: [
    { name: "Mon", Purchase: 4000, Sales: 2400 },
    { name: "Tue", Purchase: 3000, Sales: 1398 },
    { name: "Wed", Purchase: 2000, Sales: 9800 },
    { name: "Thu", Purchase: 2780, Sales: 3908 },
    { name: "Fri", Purchase: 1890, Sales: 4800 },
    { name: "Sat", Purchase: 2390, Sales: 3800 },
    { name: "Sun", Purchase: 3490, Sales: 4300 },
  ],
  Monthly: [
    { name: "Jan", Purchase: 45000, Sales: 42000 },
    { name: "Feb", Purchase: 52000, Sales: 40000 },
    { name: "Mar", Purchase: 38000, Sales: 45000 },
    { name: "Apr", Purchase: 30000, Sales: 38000 },
    { name: "May", Purchase: 37000, Sales: 41000 },
    { name: "Jun", Purchase: 25000, Sales: 35000 },
    { name: "Jul", Purchase: 32000, Sales: 28000 },
    { name: "Aug", Purchase: 26000, Sales: 24000 },
    { name: "Sep", Purchase: 40000, Sales: 38000 },
    { name: "Oct", Purchase: 28000, Sales: 32000 },
    { name: "Nov", Purchase: 15000, Sales: 60000 },
    { name: "Dec", Purchase: 25000, Sales: 18000 },
  ],
  Yearly: [
    { name: "2021", Purchase: 450000, Sales: 420000 },
    { name: "2022", Purchase: 520000, Sales: 400000 },
    { name: "2023", Purchase: 600000, Sales: 580000 },
    { name: "2024", Purchase: 750000, Sales: 800000 },
  ],
};

const StatsChart = ({ title = "Sales & Purchase" }) => {
  const [filter, setFilter] = useState("Monthly");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const data = dataMap[filter];

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>{title}</h3>
        <div className="filter-dropdown">
          <button className="filter-btn" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <Calendar size={18} />
            <span>{filter}</span>
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              {Object.keys(dataMap).map((opt) => (
                <div
                  key={opt}
                  className={`dropdown-item ${filter === opt ? "active" : ""}`}
                  onClick={() => {
                    setFilter(opt);
                    setIsDropdownOpen(false);
                  }}
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="chart-body">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barGap={8}
          >
            <defs>
              <linearGradient id="purchaseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#817AF3" />
                <stop offset="48%" stopColor="#74B0FA" />
                <stop offset="100%" stopColor="#79D0F1" />
              </linearGradient>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#46A46C" />
                <stop offset="48%" stopColor="#51CC5D" />
                <stop offset="100%" stopColor="#57DA65" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#858D9D', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#858D9D', fontSize: 12 }}
              dx={-10}
            />
            <Tooltip 
              cursor={{ fill: '#f5f5f5' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Legend 
              verticalAlign="bottom" 
              align="left" 
              iconType="circle"
              wrapperStyle={{ paddingTop: '20px' }}
            />
            <Bar 
              dataKey="Purchase" 
              fill="url(#purchaseGradient)" 
              radius={[5, 5, 0, 0]} 
              barSize={10}
            />
            <Bar 
              dataKey="Sales" 
              fill="url(#salesGradient)" 
              radius={[5, 5, 0, 0]} 
              barSize={10}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatsChart;

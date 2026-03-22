import { useEffect } from "react";
import { useHeader } from "../../contexts/header-context";
import StatsChart from "../../components/common/StatsChart/StatsChart";
import TopProducts from "../../components/common/TopProducts/TopProducts";
import "./statistics.css";
import { CreditCard, Activity } from "lucide-react";

const summaryCards = [
  {
    title: "Total Revenue",
    value: "₹2,32,875",
    change: "+20.1% from last month",
    icon: "₹",
    bgColor: "#FAD85D",
  },
  {
    title: "Products Sold",
    value: "8,294",
    change: "+180.1% from last month",
    icon: <CreditCard />,
    bgColor: "#0BF4C8", 
  },
  {
    title: "Products In Stock",
    value: "234",
    change: "+19% from last month",
    icon: <Activity />,
    bgColor: "#F2A0FF",
  },
];

const topProducts = [
  { name: "Redbull", rating: 5 },
  { name: "Kit kat", rating: 4 },
  { name: "Coca cola", rating: 4 },
  { name: "Milo", rating: 3 },
  { name: "Ariel", rating: 4 },
  { name: "Bru", rating: 5 },
];

const Statistics = () => {
  const { setTitle } = useHeader();

  useEffect(() => {
    setTitle("Statistics");
  }, [setTitle]);

  return (
    <div className="statistics-page">
      <div className="stats-summary-grid">
        {summaryCards.map((card, index) => (
          <div 
            className="stat-card" 
            key={index}
            style={{ backgroundColor: card.bgColor }}
          >
            <div className="card-top">
              <span className="card-title">{card.title}</span>
              <span className="card-icon">{card.icon}</span>
            </div>
            <div className="card-middle">
              <span className="card-value">{card.value}</span>
            </div>
            <div className="card-bottom">
              <span className="card-change">{card.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="stats-main-content">
        <div className="chart-wrapper">
          <StatsChart />
        </div>
        <div className="sidebar-wrapper">
          <TopProducts />
        </div>
      </div>
    </div>
  );
};

export default Statistics;

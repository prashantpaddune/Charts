import React from 'react';
import useGetData from "./hooks/useGetData";
import { BarChart } from "./components/BarChart";
import LineChart from "./components/LineChart";
import { PieChart } from "./components/PieChart";
import './App.css';

const App: React.FC = () => {
    const {
        status,
        error,
        countryChartData,
        platformChartData,
        userSatisfactionData,
        responseChartData,
        categoryChartData
    } = useGetData();

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed' || error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="chart-container">
            <div className="chart-box">
                <h1 className="chart-title">Queries Per Category</h1>
                <div className="canvas-container">
                    <BarChart data={categoryChartData} title="Category Distribution" />
                </div>
            </div>

            <div className="chart-box">
                <h1 className="chart-title">Response Time Trends</h1>
                <div className="canvas-container">
                    <LineChart data={responseChartData} title="Daily and Weekly Response Times" />
                </div>
            </div>

            <div className="chart-box">
                <h1 className="chart-title">User Satisfaction Ratings</h1>
                <div className="pie-canvas-container">
                    <PieChart data={userSatisfactionData} title="User Satisfaction" />
                </div>
            </div>

            <div className="chart-box">
                <h1 className="chart-title">Usage by Platform</h1>
                <div className="canvas-container">
                    <BarChart data={platformChartData} title="Usage by Platform" />
                </div>
            </div>

            <div className="chart-box">
                <h1 className="chart-title">Usage by Platform</h1>
                <div className="pie-canvas-container">
                    <PieChart data={userSatisfactionData} title="User Satisfaction" />
                </div>
            </div>
        </div>
    );
};

export default App;

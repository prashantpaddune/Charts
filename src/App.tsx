import React from 'react';
import useGetData from "./hooks/useGetData";
import { BarChart } from "./components/BarChart";
import LineChart from "./components/LineChart";

interface DayData {
    date: string;
    average_time: number;
}

interface WeekData {
    week: string;
    average_time: number;
}

const App: React.FC = () => {
    const { status, data, error } = useGetData();

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed' || error) {
        return <div>Error: {error}</div>;
    }

    const {
        category_distribution = {},
        response_times = { day_wise: [], week_wise: [] },
    } = data?.[0] || {};


    const labels = [
        ...response_times.day_wise.map((day: DayData) => day?.date),
        ...response_times.week_wise.map((week: WeekData) => `Week ${week?.week}`),
    ];

    const dataPoints = [
        ...response_times.day_wise.map((day: DayData) => day.average_time),
        ...response_times.week_wise.map((week: WeekData) => week.average_time),
    ];

    const lineChartData = {
        labels,
        datasets: [
            {
                label: 'Average Response Time',
                data: dataPoints,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    return (
        <div>
            <h1>Queries Per Category</h1>
            <BarChart data={category_distribution} title="Category Distribution" />

            <h1>Response Time Trends</h1>
            <LineChart data={lineChartData} title="Daily and Weekly Response Times" />
        </div>
    );
};

export default App;

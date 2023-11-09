// BarChartComponent.tsx

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor: string[];
        backgroundColor: string[];
        borderWidth?: number;
    }[];
}

interface BarChartProps {
    data: BarChartData;
    title?: string;
}

export const BarChart: React.FC<BarChartProps> = ({ data, title }) => {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: !!title,
                text: title,
            },
        },
    };

    return <Bar data={data} options={options} />;
};

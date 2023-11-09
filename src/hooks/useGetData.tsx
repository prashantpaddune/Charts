import { useAppDispatch, useAppSelector } from "../store";
import { useEffect } from "react";
import { fetchData } from "../reducers/slice";


interface DayData {
    date: string;
    average_time: number;
}

interface WeekData {
    week: string;
    average_time: number;
}

interface RatingsData {
    rating: string;
    count: number;
}


const useGetData = () => {
    const dispatch = useAppDispatch();
    const { data, status, error } = useAppSelector((state) => state.data);

    const BASE_URL = 'https://654b72db5b38a59f28ef171b.mockapi.io'

    useEffect(() => {
        dispatch(fetchData(`${BASE_URL}/api/v1/data`));
    }, [dispatch]);


    const {
        category_distribution = {},
        response_times = { day_wise: [], week_wise: [] },
        user_satisfaction = { ratings: [] },
        usage_statistics: { by_platform = [], by_country = [] } = {},
    } = data?.[0] || {};


    const labels = [
        ...response_times.day_wise.map((day: DayData) => day?.date),
        ...response_times.week_wise.map((week: WeekData) => `Week ${week?.week}`),
    ];

    const dataPoints = [
        ...response_times.day_wise.map((day: DayData) => day.average_time),
        ...response_times.week_wise.map((week: WeekData) => week.average_time),
    ];

    const categoryChartData = {
        labels: Object.keys(category_distribution),
        datasets: [
            {
                label: 'Queries',
                data: Object.values(category_distribution).map(value => value as number),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    const responseChartData = {
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

    const userSatisfactionData = {
        labels: user_satisfaction.ratings.map((rating: RatingsData) => `Rating ${rating.rating}`),
        datasets: [{
            data: user_satisfaction.ratings.map((rating: RatingsData) => rating.count),
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF'
            ]
        }]
    };

    const countryChartData = {
        labels: Object.keys(by_country || {}),
        datasets: [
            {
                label: 'Usage by Country',
                data: Object.values(by_country).map(value => value as number),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                ],
            },
        ],
    };

    const platformChartData = {
        labels: Object.keys(by_platform),
        datasets: [
            {
                label: 'Queries',
                data: Object.values(by_platform).map(value => value as number),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    return {
        status,
        error,
        categoryChartData,
        responseChartData,
        userSatisfactionData,
        countryChartData,
        platformChartData
    }
}

export default useGetData;
import React from 'react';
import useGetData from "./hooks/useGetData";
import { BarChart } from "./components/BarChart";

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
    } = data?.[0] || {};

    return (
        <div>
            <h1>Queries Per Category</h1>
            <BarChart data={category_distribution} title="Category Distribution" />
        </div>
    );
};

export default App;

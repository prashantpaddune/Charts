import React from 'react';
import useGetData from "./hooks/useGetData";

const App: React.FC = () => {
    const { status, data, error } = useGetData();

    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>Error: {error}</div>;

    return (
        <div>
            {JSON.stringify(data)}
        </div>
    );
};

export default App;

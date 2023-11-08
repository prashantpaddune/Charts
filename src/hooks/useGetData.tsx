import { useAppDispatch, useAppSelector } from "../store";
import { useEffect } from "react";
import { fetchData } from "../reducers/slice";

const useGetData = () => {
    const dispatch = useAppDispatch();
    const { data, status, error } = useAppSelector((state) => state.data);

    const BASE_URL = 'https://654b72db5b38a59f28ef171b.mockapi.io'

    useEffect(() => {
        dispatch(fetchData(`${BASE_URL}/api/v1/data`));
    }, [dispatch]);

    return {
        data,
        status,
        error
    }
}

export default useGetData;
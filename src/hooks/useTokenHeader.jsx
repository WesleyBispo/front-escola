import { useEffect } from 'react';
import axios from '../services/axios';

const useTokenHeader = (token) => {
    useEffect(() => {
        if (token) {
            axios.defaults.headers.Authorization = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.Authorization;
        }
    }, [token]);
};

export default useTokenHeader;

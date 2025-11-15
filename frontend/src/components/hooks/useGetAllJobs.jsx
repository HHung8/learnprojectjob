import axios from 'axios'
import React, { useEffect } from 'react'
import { JOB_API_END_POINT } from '../../config/api';
import { useDispatch } from 'react-redux';
import { setAllJobs } from '../../redux/jobSlice';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const fetchAllJobs = async() => {
        try {
            const res = await axios.get(`${JOB_API_END_POINT}/get`, {withCredentials:true});
            console.log(`check get all API`, res);
            if(res.data.success) {
                dispatch(setAllJobs(res.data.jobs))
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAllJobs();
    },[])
}

export default useGetAllJobs
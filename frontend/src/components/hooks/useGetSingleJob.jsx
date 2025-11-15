import {setSingleJob } from "../../redux/jobSlice";
import { JOB_API_END_POINT } from "../../config/api";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetSingleJob = ({jobId}) => {
    const dispatch = useDispatch();
    const fetchSingleJob = async() => {
        try {
            const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {withCredentials:true});
            if(res.data.success) {
                dispatch(setSingleJob(res.data.job));
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchSingleJob()
    },[])
    return (
    <div>useGetSingleJob</div>
  )
}

export default useGetSingleJob
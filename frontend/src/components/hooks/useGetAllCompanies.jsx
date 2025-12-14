import { COMPANY_API_END_POINT } from "../../config/api";
import  axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCompanies} from "../../redux/companySlice";

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    const fetchCompanies = async() => { 
        try {
            const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {withCredentials:true});
            console.log(`check res api company123`, res);
            if(res.data.success) {
                dispatch(setCompanies(res.data.companies));
            }
        } catch (error) {
            console.log(error);
        }
    }   
    useEffect(() => {
        fetchCompanies()
    }, [])
};

export default useGetAllCompanies;
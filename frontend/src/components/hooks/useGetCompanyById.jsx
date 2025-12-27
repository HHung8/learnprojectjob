import { COMPANY_API_END_POINT, JOB_API_END_POINT } from "../../config/api";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../../redux/companySlice";

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {withCredentials:true});
                console.log(`check rescompany123`,res);
                if(res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log(error);
            }
        }
    useEffect(() => {
        fetchSingleCompany();
    }, [companyId, dispatch]);
}

export default useGetCompanyById
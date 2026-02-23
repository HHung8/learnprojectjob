import { useEffect } from "react";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "../config/api";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "../redux/jobSlice";
import { toast } from "sonner";
import { useState } from "react";

const JobDescription = () => {
  const {singleJob} = useSelector(store => store.job);
  const {user} = useSelector(store => store.auth);
  const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant_id === user?.id);
  const [isApplied, setIsApplied] = useState(isIntiallyApplied)
    
  // const isApplied = true;
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async() => {
    try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
        if(res.data.success) {
            setIsApplied(true);
            const updateSingleJob = {...singleJob, applications:[...singleJob.applications, {applicant_id: user?.id}]};
            dispatch(setSingleJob(updateSingleJob));
            toast.success(res.data.message);
        }
    } catch (error) {
       console.log(error); 
    }
  }


  useEffect(() => {
    const fetchSingleJob = async () => {
        try {
            const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {withCredentials:true});
            console.log(`check JobDescriptions`, res);
            if(res.data.success){
                dispatch(setSingleJob(res.data.job));
                setIsApplied(res.data.job.applications.some(application => application.applicant_id === user?.id));
            }
        } catch (error) {
            console.log(error);
        }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?.id])
  

  return (
    <div className='max-w-7xl mx-auto my-10'>
        <div className='flex items-center justify-between'>
            <div>
                <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                <div className='flex items-center gap-2 mt-4'>
                    <Badge className={'text-blue-700 font-bold'} variant="ghost" >{singleJob?.position} Positions</Badge>
                    <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleJob?.job_type}</Badge>
                    <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{singleJob?.salary}PLA</Badge>
                </div>
            </div>
            <Button 
                onClick={isApplied ? null : applyJobHandler}
                disable={isApplied} 
                className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed': 'bg-[#09b651] hover:bg-[#06d55c]'}`}>
                {isApplied ? 'Already Applied' : 'Apply Now'}
            </Button>
        </div>
        <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
         <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience_level}</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.created_at?.split("T")[0]}</span></h1>
            </div>
    </div>
  )
}

export default JobDescription
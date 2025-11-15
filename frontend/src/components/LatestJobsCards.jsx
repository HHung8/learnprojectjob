import { useNavigate } from 'react-router-dom'
import { Badge } from "@/components/ui/badge"

const LatestJobsCards = ({jobHook}) => {
  const navigate = useNavigate();
  console.log(`check jobHook`, jobHook)
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
        <div>
            <h1 className='font-medium text-lg'>{jobHook?.company?.name}</h1>
            <p className='text-sm text-gray-500'>India</p>
        </div>
        <div>
            <h1 className='font-bold text-lg my-2'>{jobHook?.title}</h1>
            <p className='text-sm text-gray-600'>{jobHook?.description}</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
            <Badge className={'text-blue-700 font-bold'} variant="ghost"> {jobHook?.position} Positions</Badge>
            <Badge className={'text-[#F83002] font-bold'} variant="ghost">{jobHook.job_type}</Badge>
            <Badge className={'text-[#7029b7] font-bold'} variant="ghost">{jobHook.salary} LPA</Badge>
        </div>
    </div>
  )
}

export default LatestJobsCards
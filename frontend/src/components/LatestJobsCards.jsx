import { useNavigate } from 'react-router-dom'
import { Badge } from "@/components/ui/badge"

const LatestJobsCards = () => {
  const navigate = useNavigate();

  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
        <div>
            <h1 className='font-medium text-lg'>Test Jobs</h1>
            <p className='text-sm text-gray-500'>India</p>
        </div>
        <div>
            <h1 className='font-bold text-lg my-2'>Jobs Title2</h1>
            <p className='text-sm text-gray-600'>Description</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
            <Badge className={'text-blue-700 font-bold'} variant="ghost">Positions</Badge>
            <Badge className={'text-[#F83002] font-bold'} variant="ghost">Test 1</Badge>
            <Badge className={'text-[#7029b7] font-bold'} variant="ghost" >LPA</Badge>
        </div>
    </div>
  )
}

export default LatestJobsCards
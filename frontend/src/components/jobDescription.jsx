import React from 'react';
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";

const JobDescription = () => {
  const isApplied = true;
  return (
    <div className='max-w-7xl mx-auto my-10'>
        <div className='flex items-center justify-between'>
            <div>
                <h1 className='font-bold text-xl'>FrontEnd Developer</h1>
                <div className='flex items-center gap-2 mt-4'>
                    <Badge className={'text-blue-700 font-bold'} variant="ghost" >12 Positions</Badge>
                    <Badge className={'text-[#F83002] font-bold'} variant="ghost" >ParTime</Badge>
                    <Badge className={'text-[#7209b7] font-bold'} variant="ghost" >24PLA</Badge>
                </div>
            </div>
            <Button 
                disable={isApplied} 
                className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed': 'bg-[#09b651] hover:bg-[#06d55c]'}`}>
                {isApplied ? 'Already Applied' : 'Apply Now'}
            </Button>
        </div>
        <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
         <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>FrontEnd Developer</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>Hyderabad</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>Lorem, ipsum dolor.</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'> 2yrs</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>12LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>4</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>08-10-2024</span></h1>
            </div>
    </div>
  )
}

export default JobDescription
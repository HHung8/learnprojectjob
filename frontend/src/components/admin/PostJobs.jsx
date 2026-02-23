import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

const PostJobs = () => {
  const [input, setInput] = useState({
    title:"",
    description:"",
    requirements:"",
    salary:"",
    location:"",
    jobType:"",
    experience:"",
    position:0,
    companyId:"",
  });
  const changeEventHandler = (e) => {
    setInput({...input, [e.target.name]:e.target.value});
  };
  
  return (
    <div>
        <Navbar />
        <div className='flex items-center justify-center w-screen my-5'>
          <div className='grid grid-cols-2 gap-2'>
            <div>
                <Label>Title</Label>
                <Input 
                  type='text' 
                  name='title' 
                  className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1' 
                  value={input.title}
                  onChange={changeEventHandler}  
                />
            </div>
            <div>
                <Label>Title</Label>
                <Input 
                  type='text' 
                  name='title' 
                  className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1' 
                  value={input.title}
                  onChange={changeEventHandler}  
                />
            </div>
            <div>
                <Label>Title</Label>
                <Input 
                  type='text' 
                  name='title' 
                  className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1' 
                  value={input.title}
                  onChange={changeEventHandler}  
                />
            </div>
          </div>
           
        </div>
    </div>
  )
}

export default PostJobs
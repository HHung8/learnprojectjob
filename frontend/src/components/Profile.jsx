import React, { useState } from 'react'
import Navbar from './shared/Navbar';
import {Avatar,AvatarImage,} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button"
import { Contact, Mail, Pen } from 'lucide-react';
import {Label} from "@/components/ui/label";
import { useSelector } from 'react-redux';
import UpdateProfileDialog from './UpdateProfileDialog';
import AppliedJobTable from './AppliedJobTable';

const skills = ["Html", "Css", "Javascript", "ReactJS"];
const isResume = true;

const Profile = () => {
  const [open, setOpen] = useState(false);
  const {user} = useSelector(store => store.auth);
  return (
    <div>
        <Navbar />
        <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
            <div className='flex justify-between'>
                <div className='flex items-center gap-4'>
                    <Avatar className="h-24 w-24">
                        <AvatarImage src='https://images.unsplash.com/photo-1658204238967-3a81a063d162?q=80&w=1462&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt="profile" />
                    </Avatar>
                    <div>
                        <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                        <p>{user?.profile?.bio}</p>
                    </div>
                </div>
                <Button onClick={() => setOpen(true)}> <Pen /> </Button>
            </div>
            <div className='my-5'>
                <div className='flex items-center gap-3 my-2'>
                    <Mail />
                    <span>{user?.email}</span>
                </div>
                <div className='flex items-center gap-3 my-2'>
                    <Contact /> 
                    <span>{user?.phone_number}</span>
                </div>
            </div>
            <div className='my-5'>
                <h1>Skills</h1>
                <div className='flex items-center gap-1'>
                    {user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item,index) => <Badge key={index}>{item}</Badge>) : <span>N/A</span>}
                </div>  
            </div>
            <div className='grid w-full max-w-sm items-center gap-1.5'>
                <Label className="text-md font-bold">Resume</Label>
                {
                    isResume ? <a href={user?.profile?.profile_photo} target='_blank' className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.profile_photo}</a> : <span>NA</span>
                }
            </div>
        </div>
        <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
            <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
            <AppliedJobTable />
        </div>
        <UpdateProfileDialog showOpen={open} setShowOpen={setOpen} />
    </div>
  )
}

export default Profile
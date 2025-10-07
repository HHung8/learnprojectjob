import React from 'react'
import Navbar from './shared/Navbar';
import {Avatar,AvatarFallback,AvatarImage,} from "@/components/ui/avatar"
import {Button} from "@/components/ui/button"
import { Pen } from 'lucide-react';

const Profile = () => {
  return (
    <div>
        <Navbar />
        <div className='max-w-4xl mx-auto bg-white border-gray-200 rounded-2xl my-5 p-8'>
            <div className='flex justify-between'>
                <div className='flex items-center gap-4'>
                    <Avatar className="h-4 w-24">
                        <AvatarImage src='https://images.unsplash.com/photo-1658204238967-3a81a063d162?q=80&w=1462&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt="profile" />
                    </Avatar>
                    <div>
                        <h1 className='font-medium text-xl'>Full Name</h1>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos hic, ex minima, nulla corrupti numquam unde saepe odio fugiat suscipit, reiciendis placeat eveniet adipisci qui animi eaque quia vero dolores!</p>
                    </div>
                    <Button> <Pen /> </Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile
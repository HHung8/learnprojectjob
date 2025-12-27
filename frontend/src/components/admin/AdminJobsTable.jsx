import React, {useEffect, useState} from 'react';
import {Table,TableCaption, TableHeader,TableRow, TableHead, TableBody, TableCell} from "@/components/ui/table";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import { Edit, Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => {
//   const {allAdminJobs, searchJobByText} = useSelector();
//   const [filterJobs, setFilterJobs] = useState(allAdminJobs);
//   const navigate = useNavigate();



  return (
    <div>
        <Table>
            <TableCaption>A list of your recent posted jobs</TableCaption>
            <TableHeader>
                <TableHead>Company Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
            </TableHeader>
            <TableBody>
                <TableCell>Test TableName</TableCell>
                <TableCell>Test Title</TableCell>
                <TableCell>2025-12-01</TableCell>
                <TableCell className="text-right cursor-pointer">
                    <Popover>
                        <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
                        <PopoverContent className="w-32">
                            <div className='flex items-center gap-2 w-fit cursor-pointer'>
                                <Edit2 className='w-4' />
                                <span>Edit</span>
                            </div>
                            <div className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                <Eye className='w-4' />
                                <span>Applications</span>
                            </div>
                        </PopoverContent>
                    </Popover>
                </TableCell>
            </TableBody>
        </Table>
    </div>
  )
}

export default AdminJobsTable
import React, {useEffect, useState} from 'react';
import {Table,TableCaption, TableHeader,TableRow, TableHead, TableBody, TableCell} from "@/components/ui/table";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import { Edit, Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => {
  const {allAdminJobs, searchJobByText} = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();
  useEffect(() => {
    console.log('called');
    const filteredJobs = allAdminJobs.filter((job) => {
        if(!searchJobByText) {
            return true;
        };
        return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company_name?.toLowerCase().includes(searchJobByText.toLowerCase());
    });
    setFilterJobs(filteredJobs)
  }, [allAdminJobs, searchJobByText])   
    
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
                {
                    filterJobs?.map((job) => (
                        <tr>    
                            <TableCell>{job?.company_name}</TableCell>
                            <TableCell>{job?.title}</TableCell>
                            <TableCell>{job?.created_at.split("T")[0]}</TableCell>
                            <TableCell className="text-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                    <PopoverContent className="w-32">
                                            <div onClick={() => navigate(`/admin/jobs/${job.id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                            <div onClick={() => navigate(`/admin/jobs/${job.id}/applications`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                <Eye className='w-4' />
                                                <span>Applications</span>
                                            </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>

                        </tr>
                    ))
                }
            </TableBody>
        </Table>
    </div>
  )
}

export default AdminJobsTable   
import React from 'react'
import {  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "../ui/table"
import {Popover, PopoverContent, PopoverTrigger} from "../ui/popover"
import { useSelector } from 'react-redux'
import { MoreHorizontal } from 'lucide-react'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '../../config/api'
import { toast } from 'sonner'

const shortlistingStatus = ["Accepted", "Rejected"]

const ApplicantsTable = () => {
  const {applicants} = useSelector(store => store.application);
  console.log(`check applicants123`, applicants);
  const statusHandler = async (status, id) => {
    console.log("called");
    try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, {status});
        console.log(`check res`, res);
        // if(res.data.success) {
        //     toast.success(res.data.message);
        // }
    } catch (error) {
        toast.error(error.response.data.message)
    }
  }
  return (
    <div>
        <Table>
            <TableCaption>A list of your recent applied user</TableCaption>
            <TableHeader>
                <TableRow>  
                    <TableHead>FullName</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Resume</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className='text-right'>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    applicants && applicants.map((item) =>  (
                        <TableRow key={item?.id}>
                            <TableCell>{item?.applicant_name}</TableCell>
                            <TableCell>{item?.applicant_email}</TableCell>
                            <TableCell>{item?.phone_number}</TableCell>
                            <TableCell>Resume</TableCell>
                            <TableCell>{item?.created_at.split("T")[0]}</TableCell>
                            <TableCell className='float-right cursor-pointer'>
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32">   
                                        {
                                           shortlistingStatus.map((status, index) => {
                                                return (
                                                  <div onClick={() => statusHandler(status, item.id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                                        <p>{status}</p>
                                                  </div>
                                                )
                                           })
                                        }
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow> 
                    ))
                }
            </TableBody>
        </Table>
    </div>
  )
}

export default ApplicantsTable
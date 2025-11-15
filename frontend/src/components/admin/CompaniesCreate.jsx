import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '../../config/api'

const CompaniesCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState();

  const registerNewCompany = async () => {
    try {
       const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
        headers:{'Content-Type':'application/json'},
        withCredentials:true
       });
       console.log(`check resdata`, res.data);
    } catch (error) {
        console.log(error);
    }
  }

  const handleCancel = () => {
    navigate("/admin/companies")
  }
  return (
    <div>
        <Navbar/>
        <div className='max-w-4xl mx-auto'>
            <div className='my-10'>
                <h1 className='font-bold text-2xl'>Your Company Name</h1>
                <p className='text-gray-600'>What would you like to give your company name? you can change this later.</p>
            </div>
            <Label>Company name</Label>            
            <Input type="text" className="my-2" placeholder="JobHunt, Microsoft etc" onChange={(e) => setCompanyName(e.target.value)} />
            <div className='flex items-center gap  -2 my-10'>
                <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                <Button>Continue</Button>
            </div>
        </div>
    </div>
  )
}

export default CompaniesCreate
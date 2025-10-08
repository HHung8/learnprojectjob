import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { useNavigate } from "react-router-dom";

const Job = () => {
  const navigate = useNavigate();
  const jobId = 'lkjasdljlkajsd';
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">2 days ago</p>
        <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
      </div>

    <div className="flex items-center gap-2 my-2">
          <Button className="p-6" variant="outline" size="icon">
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1658204238967-3a81a063d162?q=80&w=2324&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </Avatar>
          </Button>
          <div>
            <h1 className="font-medium text-lg">Company Name</h1>
            <p className="text-sm text-gray-500">India</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
             <Badge className={'text-blue-700 font-bold'} variant='ghost'>Positions</Badge>
             <Badge className={'text-[#F83002] font-bold'} variant='ghost'>2</Badge>
             <Badge className={'text-[#7209b7] font-bold'} variant='ghost'>LPA</Badge>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <Button onClick={() => navigate(`/description/${jobId}`)}>Detail</Button>
            <Button className="bg-[#09b774]">Save For Later</Button>
          </div>
    </div>
  );
};

export default Job;

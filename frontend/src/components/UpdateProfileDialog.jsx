import {Dialog,DialogContent,DialogFooter,DialogHeader,DialogTitle,} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import {Button} from "@/components/ui/button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import API_BASE_URL from "../config/api";
import { toast } from "sonner";
import { setUser } from "../redux/authSlice";

const UpdateProfileDialog = ({showOpen, setShowOpen}) => {
  const [loading, setLoading] = useState(false);
  const {user} = useSelector(store => store.auth);
  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phone_number: user?.phone_number,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills.join(", "),
    file: user?.profile?.profile_photo,
  });
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({...input, [e.target.name]: e.target.value});
    console.log(`check e`, e.target.name);  
  }

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({...input, file})
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const fromData = new FormData();
    fromData.append("userId", user.id);
    fromData.append("fullname", input.fullname);
    fromData.append("email", input.email);
    fromData.append("phone_number", input.phone_number);
    fromData.append("bio", input.bio);
    fromData.append("skills", input.skills);
    if(input.file) {
        fromData.append("file", input.file);
    }

    try {
        setLoading(true)
        const res = await axios.post(`${API_BASE_URL}/user/profile/update`, fromData, {
            headers: {
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        });
        if(res.status === 200) {
            dispatch(setUser(res.data.user))
            toast.success(res.data.message);
        }
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
    setShowOpen(false);
    console.log(input)
  }

  return (
    <div>
        <Dialog open={showOpen} onOpenChange={() => setShowOpen(false)}>
            <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setShowOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input 
                                id="fullname"
                                name="fullname"
                                value={input.fullname}
                                onChange={changeEventHandler}
                                className="col-span-3"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input 
                                id="email"
                                name="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                className="col-span-3"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="number" className="text-right">Number</Label>
                            <Input 
                                id="phone_number"
                                name="phone_number"
                                value={input.phone_number}
                                onChange={changeEventHandler}
                                className="col-span-3"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="bio" className="text-right">Bio</Label>
                            <Input 
                                id="bio"
                                name="bio"
                                value={input.bio}
                                onChange={changeEventHandler}
                                className="col-span-3"
                            />
                        </div>
                         <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="skills" className="text-right">Skills</Label>
                            <Input 
                                id="skills"
                                name="skills"
                                value={input.skills}
                                onChange={changeEventHandler}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                           <Label htmlFor="file" className="text-right">Resume</Label>
                            <Input 
                                id="file"
                                name="file"
                                type="file"
                                onChange={fileChangeHandler}
                                className="col-span-3"
                            />
                        </div>
                    </div>  
                    <DialogFooter>
                        {
                            loading 
                            ? <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait</Button>
                            : <Button type="submit" className="w-full my-4">Update</Button>
                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default UpdateProfileDialog

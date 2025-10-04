import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phone_number: "",
    password: "",
    role: "",
    file: "",
  });
  const navigate = useNavigate();
  const {loading} = useSelector(store => store.auth);
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({...input, file:e.target.files?.[0]});
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phone_number", input.phone_number);
    formData.append("role", input.role);
    if(input.file){
        formData.append("file", input.file);
    }
    try {
        dispatch(setLoading(true));
        const res = await axios.post(`${API_BASE_URL}/user/register`, formData, {
            headers: { 'Content-Type': "multipart/form-data" },
            withCredentials: true,
        });
        if(res.status === 201) {
            toast.success(res.data.message)
            navigate("/login")
        }
    } catch (error) {
        console.error(error);
        toast.error(error.response.data.message);
        console.log(`check error`, error.response.data.message);
    } finally {
      dispatch(setLoading(false))
    }
  }
  
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              onChange={changeEventHandler}
              name="fullname"
              placeholder="patel"
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              onChange={changeEventHandler}
              name="email"
              placeholder="huuhungnguyen2002@gmail.com"
            />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              type="text"
              value={input.phone_number}
              onChange={changeEventHandler}
              name="phone_number"
              placeholder="096123221"
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              onChange={changeEventHandler}
              name="password"
              placeholder="12983Asdjk@"
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  checked={input.role === "student"}
                  value="student"
                  className="cursor-pointer"
                  onChange={changeEventHandler}
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  checked={input.role === "recruiter"}
                  value="recruiter"
                  className="cursor-pointer"
                  onChange={changeEventHandler}
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                className="cursor-pointer"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          {
            loading 
            ? <Button> <Loader2 className="mr-2 h-4 w-4 animate-spin " /> Please wait </Button>
            : <Button type="submit" className="w-full my-4">Sign up</Button>
          }
          <span className="text-sm">Already have an account ? <Link to="/login" className="text-blue-600">Login</Link> </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;

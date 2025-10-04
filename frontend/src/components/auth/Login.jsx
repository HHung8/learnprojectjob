import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";

const Login = () => {
  const [input, setInput] = useState({ 
    email: "", 
    password: "", 
    role: "" 
  });
  const navigate = useNavigate();
  const {loading} = useSelector(store => store.auth);
  const dispatch = useDispatch();
  
  const changeEventHandler = (e) => {
      setInput({ ...input, [e.target.name]: e.target.value });
      console.log(`check input`, input);
  }

  const submitHandler = async (e) => {
      e.preventDefault();
      try {
        dispatch(setLoading(true));
        const res = await axios.post(`${API_BASE_URL}/user/login`, input, {
          headers: {
            "Content-Type":"application/json"
          },
          withCredentials: true
        });
        console.log(`check response`, res);
        console.log('`check 123`', 123)
        if(res.status === 200) {
          toast.success(res.data.message)
          navigate("/")
        }
          
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.message);
        console.log(`check error`, error.response.data.message);
      } finally {
        dispatch(setLoading(false));
      }
  }

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler} 
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
          <h1 className="font-bold text-xl mb-5">Login</h1>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              placeholder="yushingdev@gmail.com"
              onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              placeholder="1112743Qew"
              onChange={changeEventHandler}
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  className="cursor-pointer"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  className="cursor-pointer"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {
            loading 
            ? <Button className="w-full my-4"> <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait</Button>
            : <Button type="submit" className="w-full my-4">Login</Button>
          }
          <span className="text-sm">Don't have an account ? <Link to="/signup" className="text-blue-600">Signup</Link> </span>
        </form>
      </div>
    </div>
  );
};

export default Login;

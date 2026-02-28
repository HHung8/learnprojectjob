import React from "react";
import {Carousel,CarouselContent,CarouselItem,CarouselNext,CarouselPrevious} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { setSearchedQuery } from "../redux/jobSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const category = [
  "FrontEnd Developer",
  "BackEnd Developer",
  "FullStack Developer",
  "Data Science",
  "Graphic Designer",
  "Data Science",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }

  return (
    <Carousel className="w-full max-w-xl mx-auto my-20">
      <CarouselContent>
        {
          category.map((cat, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Button onClick={() => searchJobHandler(cat)} variant="outline" className="rounded-full">{cat}</Button>
            </CarouselItem>
          ))
        }
      </CarouselContent>    
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CategoryCarousel;

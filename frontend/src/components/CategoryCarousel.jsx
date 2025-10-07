import React from "react";
import {Carousel,CarouselContent,CarouselItem,CarouselNext,CarouselPrevious} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const category = [
  "FrontEnd Developer",
  "BackEnd Developer",
  "FullStack Developer",
  "Data Science",
  "Graphic Designer",
  "Data Science",
];

const CategoryCarousel = () => {
  return (
    <Carousel className="w-full max-w-xl mx-auto my-20">
      <CarouselContent>
        {category.map((cat, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <Button className="rounded-full">{cat}</Button>
          </CarouselItem>
        ))}
      </CarouselContent>    
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CategoryCarousel;

/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const carouselItems = [
  {
    image: "/pic1.png",
    alt: "Learning",
    title: "Quality Learning",
    description: "Access high-quality learning materials anytime.",
  },
  {
    image: "/pic2.png",
    alt: "Accessibility",
    title: "Accessible Anywhere",
    description: "Learn offline and track your progress easily.",
  },
  {
    image: "/pic3.jpg",
    alt: "Skills",
    title: "Skill-Based Training",
    description: "Develop real-world skills for future success.",
  },
];

const GetStarted: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      {/* Logo at the top */}
      <div className="w-full py-4 px-6">
        <h1 className="text-2xl font-bold text-gray-100">EduBridge</h1>
      </div>

      {/* Carousel Section (Responsive Centered) */}
      <div className="flex-grow flex justify-center w-full px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl">
          <Carousel>
            <CarouselContent
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {carouselItems.map((item, index) => (
                <CarouselItem key={index} className="w-full flex-shrink-0">
                  <div className="p-4 bg-black text-center">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-full max-h-[400px] object-cover rounded-md"
                    />
                    <h2 className="text-lg font-semibold mt-4">{item.title}</h2>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Indicator Dots */}
          <div className="flex justify-center space-x-2 mt-4">
            {carouselItems.map((_, index) => (
              <span
                key={index}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "bg-blue-600 w-5" : "bg-gray-400"
                }`}
              ></span>
            ))}
          </div>
        </div>
      </div>

      {/* Get Started Button (Bottom, Centered) */}
      <div className="w-full flex justify-center py-6">
        <Button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default GetStarted;

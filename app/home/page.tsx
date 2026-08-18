"use client"

import { ArrowRight, Search } from "lucide-react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { CardsComponent } from "@/components/CardsComponent";
import { useEffect, useState } from "react";
import showPopularBooks from "@/api/showBooks";
import { booksArrayType } from "@/types/dataTypes";


export default function HomePage()
{
  const[books, setBooks] = useState<booksArrayType>([])

  useEffect(() => {
    async function fetchBooks() {
      const data = await showPopularBooks();
      console.log("popular books:", data);
      setBooks(data?.docs || []);
    }

    fetchBooks();
  }, []);

    return(
      <div className="flex w-full justify-center items-center px-4 sm:px-6 lg:px-0">
        <div className="w-full max-w-[1280px]">
            <div className="flex flex-col items-center justify-center gap-8 w-full lg:flex-row lg:items-center lg:gap-3">
                <div className="flex flex-col items-start justify-start gap-7 w-full max-w-[430px] lg:w-[430px] lg:items-start">
                    <p className="text-[oklch(0.82_0.16_82)] text-[16px] text-center lg:text-left">DESCOVER YOUR NEXT BOOK.</p>
                    <h1 className="text-[32px] sm:text-[38px] lg:text-[46px] text-center lg:text-left">Explore. Discover. <span className="text-[oklch(0.82_0.16_82)]">Read.</span></h1>
                    <p className="text-[15px] w-full max-w-[270px] text-center lg:text-left lg:w-[270px]">Find Your next great read from thousands of books</p>
                    <div className="w-full h-[44px] flex items-center justify-between border-1 border-gray-400 rounded-[12px]">
                        <input className="w-[80%] outline-none h-full pl-3" placeholder="Search for books..." />
                        <div className="h-full w-[45px] flex justify-center items-center rounded-tr-[12px] rounded-br-[12px] bg-[oklch(0.82_0.16_82)]">
                          <Search className="" />
                        </div>
                    </div>
                </div>
                <div className="w-full max-w-[670px] lg:w-auto">
                    <Image src='/hero.png' alt="" width={670} height={400} className="h-auto w-full max-w-[670px]"/>
                </div>
            </div>
            <div className="w-full my-10 flex flex-col gap-6">
                <div className="xl:w-full w-[90%] mx-auto flex justify-between items-center gap-4">
                    <p className="text-[24px] font-bold">Popular Books</p>
                    <div className="flex gap-2 items-center">
                        <p className="text-[oklch(0.82_0.16_82)] text-[16px]">View All</p>
                        <ArrowRight className="text-[16px] text-[oklch(0.82_0.16_82)]" />
                    </div>
                </div>
               <div className="flex justify-center items-center w-full">
               <Carousel
                  opts={{
                      align: "start",
                  }}
                  className="w-[70%] md:w-[91%] lg:w-[90%] xl:w-[98%]"
               >
                <CarouselContent className="pl-3">
                  {books.map((item, index) => (
                    <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3 xl:basis-1/4">
                      <div className="p-1">
                        <CardsComponent 
                          author_name={item.author_name}
                          cover_i={item.cover_i}
                          first_publish_year={item.first_publish_year}
                          title={item.title}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              </div>
            </div>
        </div>
     </div>
    )
}
"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import showPopularBooks from "@/api/showBooks";
import { booksArrayType } from "@/types/dataTypes";
import { categories } from "@/categories";
import { Card } from "@/components/ui/card";
import { ArrowRight, Search } from "lucide-react";
import { motion, Variants } from "framer-motion";
import BooksSection from "@/components/BooksSection";
import showFeaturedBooks from "@/api/showFeaturedBooks";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};


export default function HomePage()
{
  const[books, setBooks] = useState<booksArrayType>([])
  const[featuredBooks , setFeaturedBooks] = useState<booksArrayType>([])

  useEffect(() => {
    async function fetchPobularBooks() {
      const data = await showPopularBooks();
      console.log("popular books:", data);
      setBooks(data?.docs?.map((book: { key: string }) => ({ ...book, id: book.key })) || []);
    }

    async function fetchFeaturedBooks() {
      const data = await showFeaturedBooks();
      console.log("Featured books:", data);
      setFeaturedBooks(data?.docs?.map((book: { key: string }) => ({ ...book, id: book.key })) || []);
    }

    fetchPobularBooks();
    fetchFeaturedBooks();
  }, []);

  
    return(
      <div className="flex w-full justify-center items-center px-4 sm:px-6 lg:px-0">
        <div className="w-full max-w-[1280px]">
            <motion.div
              className="flex flex-col items-center justify-center gap-8 w-full lg:flex-row lg:items-center lg:gap-3"
              initial="hidden"
              animate="visible"
              variants={sectionVariants}
            >
                <motion.div className="flex flex-col items-start justify-start gap-7 w-full max-w-[430px] lg:w-[430px] lg:items-start" variants={sectionVariants}>
                    <p className="text-[oklch(0.82_0.16_82)] text-[16px] text-center lg:text-left">DESCOVER YOUR NEXT BOOK.</p>
                    <h1 className="text-[32px] sm:text-[38px] lg:text-[46px] text-center lg:text-left">Explore. Discover. <span className="text-[oklch(0.82_0.16_82)]">Read.</span></h1>
                    <p className="text-[15px] w-full max-w-[270px] text-center lg:text-left lg:w-[270px]">Find Your next great read from thousands of books</p>
                    <div className="w-full h-[44px] flex items-center justify-between border-1 border-gray-400 rounded-[12px]">
                        <input className="w-[80%] outline-none h-full pl-3" placeholder="Search for books..." />
                        <div className="h-full w-[45px] flex justify-center items-center rounded-tr-[12px] rounded-br-[12px] bg-[oklch(0.82_0.16_82)]">
                          <Search className="" />
                        </div>
                    </div>
                </motion.div>
                <motion.div className="w-full max-w-[670px] lg:w-auto" variants={sectionVariants}>
                    <Image src='/hero.png' alt="" width={670} height={400} className="h-auto w-full max-w-[670px]"/>
                </motion.div>
              </motion.div>
              <motion.div
                className="w-full my-10 flex flex-col gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={sectionVariants}
              >
                <div className="xl:w-full w-[90%] mx-auto flex justify-between items-center gap-4">
                    <p className="text-[24px] font-bold">Popular Books</p>
                    <div className="flex gap-2 items-center">
                        <p className="text-[oklch(0.82_0.16_82)] text-[16px]">View All</p>
                        <ArrowRight className="text-[16px] text-[oklch(0.82_0.16_82)]" />
                    </div>
                </div>
                <BooksSection books={books} />
              </motion.div>

            {/* Categories */}

            <motion.div
              className="w-full my-10 flex flex-col gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={sectionVariants}
            >
              <div className="xl:w-full w-[90%] mx-auto flex justify-between items-center gap-4">
                <p className="text-[24px] font-bold">Categories</p>
                <div className="flex gap-2 items-center">
                  <p className="text-[oklch(0.82_0.16_82)] text-[16px]">View All</p>
                  <ArrowRight className="text-[16px] text-[oklch(0.82_0.16_82)]" />
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                 {categories.map((category, index) => {
                  const CategoryIcon = category.categoryIcon
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -5, scale: 1.03 }}
                        transition={{ duration: 0.3, delay: index * 0.07 }}
                        viewport={{ once: true, amount: 0.2 }}
                      >
                        <Card className="flex w-[150px] items-center gap-3 p-4">
                          <CategoryIcon className="h-5 w-5 text-[oklch(0.82_0.16_82)]" aria-hidden="true" />
                          <p className="text-[16px] font-medium">{category.categoryName}</p>
                        </Card>
                      </motion.div>
                     )
                 })}
              </div>
            </motion.div>


            {/* Featured Books */}

            <motion.div
                className="w-full my-10 flex flex-col gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={sectionVariants}
              >
                <div className="xl:w-full w-[90%] mx-auto flex justify-between items-center gap-4">
                    <p className="text-[24px] font-bold">Featured Books</p>
                    <div className="flex gap-2 items-center">
                        <p className="text-[oklch(0.82_0.16_82)] text-[16px]">View All</p>
                        <ArrowRight className="text-[16px] text-[oklch(0.82_0.16_82)]" />
                    </div>
                </div>
                <BooksSection books={featuredBooks} />
             </motion.div>
             
        </div>
     </div>
    )
}
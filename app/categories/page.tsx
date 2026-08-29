import { categories } from "@/categories";
import { BooksOfCategory } from "@/components/BooksOfCategory";
import { Button } from "@/components/ui/button";

export default function CategoriesPage()
{
    return(
        <div className="my-20 flex flex-col items-center justify-center gap-10 w-full max-w-[1280px] mx-auto ">
          <div className="text-center">
             <h1 className="text-[24px] font-bold">Books Categories</h1>
             <p className="text-[16px] text-[oklch(0.6_0.16_82)]">Discover our wide range of book categories and find your next favorite read.</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-5 w-[600px]">
            {categories.map((item , index) => {
              return (
                <BooksOfCategory key={index} categoryName={item.categoryName}/>
               )
            })}
          </div>
        </div>
    )
}
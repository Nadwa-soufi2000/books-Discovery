"use client"

import { showBookOfCategory } from "@/api/showBookOfCategory"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"
import { booksForCategoryType } from "@/types/dataTypes"
import { useState } from "react"
import { ScrollArea } from "./ui/scroll-area"



export function BooksOfCategory({categoryName} : {categoryName : string}) {
    
  const [BooksOfCategory, setBooksOfCategory] = useState<booksForCategoryType[]>([])


   const getBooksOfCategory = async (categoryName : string) => 
    {
       const data = await showBookOfCategory(categoryName)
       console.log(categoryName)
       console.log(data)
       setBooksOfCategory(data.works)
    }

    for(let i=0 ; i < BooksOfCategory.length ; i++)
    {
       console.log(`https://covers.openlibrary.org/b/id/${BooksOfCategory[i].cover_id}-M.jpg`)
    }

  return (
    <Dialog>
      <form>
        <DialogTrigger 
           render={
              <Button 
                variant="outline" 
                className="w-[130px] h-[50px]"
                onClick={() => getBooksOfCategory(categoryName)}
              >
               {categoryName}
              </Button>} />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Books for {categoryName} category</DialogTitle>
            <DialogDescription>
              Show all books for {categoryName} category
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-72 w-full rounded-md border">
            <div className="mx-auto grid w-full max-w-full grid-cols-2 gap-6 overflow-y-auto px-2 py-2 sm:grid-cols-3 lg:grid-cols-4">
               {BooksOfCategory.map((item , index) => {
               return(
                   <div key={index} className="flex flex-col items-center justify-start gap-2 text-center">
                     <Image
                       src={`https://covers.openlibrary.org/b/id/${item.cover_id}-M.jpg` !== '' ?
                       `https://covers.openlibrary.org/b/id/${item.cover_id}-M.jpg`
                       :
                        '/notfound.jpg'
                       }
                       alt=""
                       width={100}
                       height={200}
                       className="h-auto w-full max-w-[120px] rounded-sm object-cover"
                      />
                      <p className="text-base leading-tight">{item.title}</p>
                   </div>
               )
               })}
            </div>
         </ScrollArea> 
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}


import { showBookDetails } from "@/api/showBookDetails";
import Image from "next/image";

export default async function BookDetailsPage({ params }:{ params: Promise<{id: string}>}) {
        const { id } = await params;
        console.log(id)

        const bookData = await showBookDetails(id);
        console.log(bookData);

        if (!bookData) {
          return (
            <div className="flex min-h-[300px] w-full items-center justify-center px-4">
              <p>Book details are unavailable right now.</p>
            </div>
          );
        }

        const coverId = bookData.covers?.[0]

        const description = typeof bookData.description === "string"
          ? bookData.description
          : bookData.description?.value || "No description available."

        const authorKey = bookData.authors[0].author.key;
        const authorId = authorKey.split("/").pop();

        const response = await fetch(`https://openlibrary.org/authors/${authorId}.json`)
        const author = await response.json();
        console.log(author)

    return (
        <div className="flex w-full  justify-center  px-4 sm:px-6 lg:px-0">
           <div className="w-[1280px] my-10 flex flex-col justify-start gap-14">
             <div className="w-full flex items-start gap-6">
               <Image 
                 src={
                  coverId
                  ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` 
                  :  '/placeholder-book.jpg'
                 }
                 alt={bookData.title}
                 width={300}
                 height={300}
                 className="bg-gray-400 rounded-[15px] w-[250px] h-[390px]"
               />
               <div className="flex flex-col gap-4">
                  <h1 className="text-[38px] font-bold">{bookData.title}</h1>
                  <div>
                    <p className="text-[12px] w-[650px]">{description}</p>
                  </div> 
               </div>
             </div>
             <h1 className="text-[40px] font-bold">About author</h1>
             <div className="w-full border-1 border-solid border-gray-300 dark:border-gray-800 shadow-xl rounded-[15px] flex pl-3 py-5 justify-start gap-4 items-start">
                <Image 
                  src={
                    author.photos?.[0]
                    ? `https://covers.openlibrary.org/a/id/${author.photos[0]}-L.jpg`
                    : '/placeholder-author.jpg'
                  }
                  alt={author.name}
                  width={100}
                  height={100}
                  className="bg-gray-400 rounded-[15px] w-[150px] h-[150px] rounded-full"
                />
                <div>
                  <h2 className="font-semi-bold text-[24px]">{author.name}</h2>
                  <p className="text-[12px] w-[650px]">{author.bio ? author.bio : "No biography available."}</p>
                </div>
             </div>
           </div>
        </div>
    )
}

//https://covers.openlibrary.org/b/id/280246-L.jpg
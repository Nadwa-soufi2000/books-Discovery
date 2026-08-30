

import { showBookDetails } from "@/api/showBookDetails";
import Image from "next/image";


export default async function BookDetailsPage({ params }:{ params: Promise<{id: string}>}) {

    const { id } = await params;
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
      : bookData.description && typeof bookData.description === "object"
        ? bookData.description.value || "No description available."
        : "No description available."

    const authorEntry = bookData.authors?.[0]?.author;
    const authorKey = authorEntry?.key;
    const authorId = authorKey ? authorKey.split("/").pop() : null;

    let author = null;

    if (authorId) {
      const response = await fetch(`https://openlibrary.org/authors/${authorId}.json`);
      author = await response.json();
    }

    const authorName = author?.name || "Unknown author";
    const authorBio = typeof author?.bio === "string"
      ? author.bio
      : author?.bio && typeof author.bio === "object"
        ? author.bio.value || "No biography available."
        : "No biography available.";

    return (
        <div className="flex w-full  justify-center  px-4 sm:px-6 lg:px-0">
           <div className="my-10 flex w-full xl:w-[1280px] flex-col justify-start gap-8 lg:gap-14">
             <div className="flex w-full flex-col items-center gap-6 lg:flex-row lg:items-start xl:pl-0 sm:pl-4 pl-0">
               <Image 
                 src={
                  coverId
                  ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` 
                  :  '/notfound.jpg'
                 }
                 alt={bookData.title}
                 width={300}
                 height={300}
                 className="h-auto w-full max-w-[250px] rounded-[15px] bg-gray-400 sm:max-w-[220px] lg:h-[390px] lg:w-[250px] lg:max-w-none"
               />
               <div className="flex w-full flex-col gap-4 lg:w-auto">
                  <h1 className="break-words text-center text-[30px] font-bold sm:text-[34px] lg:text-left lg:text-[38px]">{bookData.title}</h1>
                  <div>
                    <p className="w-full break-words text-[12px] lg:w-[650px]">{description}</p>
                  </div> 
               </div>
             </div>
             <h1 className="text-[32px] font-bold sm:text-[36px] lg:text-[40px]">About author</h1>
             <div className="flex w-full flex-col items-center justify-start gap-4 rounded-[15px] border-1 border-solid border-gray-300 px-3 py-5 shadow-xl dark:border-gray-800 sm:flex-row sm:items-start lg:pl-3">
                <Image 
                  src={
                    author?.photos?.[0] 
                    ? `https://covers.openlibrary.org/a/id/${author.photos[0]}-L.jpg`
                    : '/user.png'
                  }
                  alt={authorName}
                  width={100}
                  height={100}
                  className="h-[120px] w-[120px] rounded-full bg-gray-400 sm:h-[130px] sm:w-[130px] lg:h-[150px] lg:w-[150px]"
                />
                <div className="w-full min-w-0">
                  <h2 className="break-words text-center text-[24px] font-semi-bold sm:text-left xl:pl-0 pl-4">{authorName}</h2>
                  <p className="w-full break-words text-[12px] lg:w-[650px] text-center sm:text-left">{authorBio}</p>
                </div>
             </div>
           </div>
        </div>
    )
}
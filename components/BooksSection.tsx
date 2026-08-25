import { CardsComponent } from "./CardsComponent";
import { motion } from "framer-motion" ;
import 
   { 
      Carousel, 
      CarouselContent, 
      CarouselItem, 
      CarouselNext, 
      CarouselPrevious 
   } from "./ui/carousel";
import { booksArrayType } from "@/types/dataTypes";


export default function BooksSection({books} : {books: booksArrayType})
{
    return (
        <div className="flex justify-center items-center w-full">
           <Carousel opts={{align: "start",}} className="w-[70%] md:w-[91%] lg:w-[90%] xl:w-[98%]" >
              <CarouselContent className="pl-3">
                 {books.filter((item) => item.cover_i).map((item, index) => (
                    <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3 xl:basis-1/4">
                      <div className="p-1">
                        <motion.div
                          initial={{ opacity: 0, y: 18 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          whileHover={{ y: -6 }}
                          transition={{ duration: 0.35, delay: Math.min(index * 0.06, 0.3) }}
                          viewport={{ once: true, amount: 0.2 }}
                        >
                        <CardsComponent
                          id={item.id?.split("/").pop() || ""}
                          author_name={item.author_name}
                          cover_i={item.cover_i}
                          first_publish_year={item.first_publish_year}
                          title={item.title}
                          />
                        </motion.div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
           </Carousel>
         </div>
    )
}
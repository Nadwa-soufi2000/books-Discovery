import { Card, CardContent } from "@/components/ui/card"
import { bookObject } from "@/types/dataTypes"
import Image from "next/image"
import Link from "next/link";

export function CardsComponent({ id, author_name, cover_i, first_publish_year, title }: bookObject) {
  const coverSrc = cover_i
    ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
    : "/placeholder-book.png";

  if (!id) {
    return null;
  }

  return (
    <Link href={`/bookDetails/${encodeURIComponent(id)}`} className="w-full h-full">
      <Card className="h-full min-h-[420px] shadow-2xl w-full sm:w-[200px] md:w-[200px] lg:w-[250px] h-[460px] flex flex-col">
        <CardContent className="flex h-full flex-col items-center justify-between p-4">
          <div className="flex w-full justify-center overflow-hidden rounded-md">
            <div className="flex h-[220px] w-full items-center justify-center bg-[#f5f1e8]">
              <Image
                src={coverSrc}
                alt={title || "Book cover"}
                width={450}
                height={500}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="line-clamp-2 text-lg font-bold">{title}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Written by: {Array.isArray(author_name) ? author_name.join(", ") : author_name}
            </p>
          </div>

          <span className="mt-3 text-lg font-semibold"><span className="text-lg">Publish year : </span>{first_publish_year}</span>
        </CardContent>
      </Card>
    </Link>
  );
}


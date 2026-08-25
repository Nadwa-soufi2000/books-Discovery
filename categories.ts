import { Atom, ArrowRight, BookOpen, Heart, Landmark, Search, Sparkles } from "lucide-react";

const categoryIcons = {
  Fiction: BookOpen,
  Fantasy: Sparkles,
  Science: Atom,
  History: Landmark,
  Romance: Heart,
  Mystery: Search,
};

export const categories = 
[
    {
      categoryName:  "Fiction" ,
      categoryIcon: BookOpen,
    }
    ,
    {
      categoryName:   "Fantasy" ,
      categoryIcon: Sparkles,
    }
    ,
    {
      categoryName:   "Science" ,
      categoryIcon: Atom,
    }
    ,
    {
      categoryName:   "History" ,
      categoryIcon: Landmark,
    }
    ,
    {
      categoryName:   "Romance" ,
      categoryIcon: Heart,
    }
    ,
    {
      categoryName:   "Mystery" ,
      categoryIcon: Search,
    }
]
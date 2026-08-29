import axios from "axios";

export async function showBookOfCategory(categoryName : string)
{
   try{
     const response = await axios.get(`https://openlibrary.org/subjects/${categoryName}.json?limit=20`)
     //console.log(response.data)
     return response.data;
   }catch(err){
     console.log(err)
     return null
   }
}
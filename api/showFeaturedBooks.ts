import axios from "axios"

export default async function showFeaturedBooks()
{
    try{
      const response = await axios.get("https://openlibrary.org/search.json?q=fiction&limit=20&fields=key,title,author_name,cover_i,first_publish_year,description")
      console.log(response.data)
      return response.data
    }catch(err) {
        console.log(err)
        return null
    }
}
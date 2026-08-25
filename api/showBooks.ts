import axios from "axios";

export async function showPopularBooks() {
    try {
        const response = await axios.get("https://openlibrary.org/search.json?q=bestseller&limit=20&fields=key,title,author_name,cover_i,first_publish_year,description");
        return response.data;
    } catch (err) {
        console.error("showPopularBooks error:", err);
        return null;
    }
}

export default showPopularBooks;
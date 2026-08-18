import axios from "axios";

export async function showPopularBooks() {
    try {
        const response = await axios.get("https://openlibrary.org/search.json?q=fiction&limit=10");
        return response.data;
    } catch (err) {
        console.error("showPopularBooks error:", err);
        return null;
    }
}

export default showPopularBooks;
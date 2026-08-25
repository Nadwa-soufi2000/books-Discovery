import axios from "axios";

export async function showBookDetails(id: string) {
    try {
       const workId = decodeURIComponent(id).replace(/^\/works\//, "");
       const response = await axios.get(`https://openlibrary.org/works/${workId}.json`)
       return response.data;
    } catch (err) {
        console.log("showBookDetails error:", err);
        return null;
    }
}
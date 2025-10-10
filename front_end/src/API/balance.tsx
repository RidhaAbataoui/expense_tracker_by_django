import axios from 'axios'
const URL = "http://127.0.0.1:8000/api/"

export const getBalance = async () => {
    try {
        const response = await axios.get(`${URL}balance`);
        return response.data;
    }catch (error) {
        console.error("Error fetching balance:", error);
        throw error;
    }
}
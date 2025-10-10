import axios from 'axios'
const URL = "http://127.0.0.1:8000/api/"

export const addTransaction = async(transaction)=>{
    try{
        const response = await axios.post(
        `${URL}expenses/`, 
        transaction,
        { headers:{
            "Content-Type":"application/json"
        },
    });
        return response.data;
    }catch(error){
        console.error("Error adding transaction:", error);
        throw error;
    }
}
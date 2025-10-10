import axios from 'axios'
const API_BASE = (import.meta.env.VITE_API_URL as string) ?? "http://127.0.0.1:8000/api"

export type Expense = {
    id?: number
    title: string
    amount: number
    category: string
    type: 'income' | 'expense'
    date: string
}

export const filterExpenses = async (opts? : {
    category?: string
    date?: Date | string
}) : Promise<Expense[]> => {
    try{
        const params : Record<string, string> = {}
        if (opts?.category && opts.category !== 'All') {
            params['category'] = opts.category.trim()
        }
        if (opts?.date) {
            params['date'] = typeof opts.date === 'string' ? opts.date : opts.date.toISOString().slice(0,10)
        }

        console.log('[filterExpenses] params:', params)

        const query = new URLSearchParams(params).toString()
        const url = `${API_BASE.replace(/\/+$/,'')}/expenses/${query ? `?${query}` : ''}`
        const res = await axios.get(url)
        return res.data
    }catch(error){
        console.error("Error filtering expenses:", error)
        throw error;
    }
}

export const getExpenseDistribution = async () => {
  const response = await axios.get(`${API_BASE}/expense-distribution/`);
  return response.data;
};
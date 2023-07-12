import axios from 'axios'
const BACKEND_URL = 'https://react-native-course-446c9-default-rtdb.firebaseio.com'

export const storeExpense = async (expenseData) => {
  const response = await axios.post(`${BACKEND_URL}/expenses.json`, expenseData)
  const id = response.data.name
  return id
}

export const fetchExpense = async () => {
  const { data } = await axios.get(`${BACKEND_URL}/expenses.json`)

  const expenses = []

  for (const key in data) {
    const expenseObj = {
      id: key,
      amount: data[key].amount,
      date: new Date(data[key].date),
      description: data[key].description,
    }

    expenses.push(expenseObj)
  }
  return expenses
}

export const deleteExpenseFromDB = (expenseId) => {
  return axios.delete(`${BACKEND_URL}/expenses/${expenseId}.json`)
}

export const updateExpenseFromDB = (expenseId, expenseData) => {
  return axios.put(`${BACKEND_URL}/expenses/${expenseId}.json`, expenseData)
}

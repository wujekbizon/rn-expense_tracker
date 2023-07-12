import { createContext, useReducer } from 'react'
import { DATA } from '../data'

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
})

const expensesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      const id = `${new Date().toString()}_${Math.random().toString()}`
      return [{ ...action.payload, id }, ...state]
    case 'UPDATE':
      const itemIndex = state.findIndex((expense) => expense.id === action.payload.id)
      const updatableExpense = state[itemIndex]
      const updatedItem = { ...updatableExpense, ...action.payload.data }
      const updatedExpenses = [...state]
      updatedExpenses[itemIndex] = updatedItem
      return updatedExpenses
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload)
    default:
      return state
  }
}

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, DATA)

  const addExpense = (expenseData) => {
    dispatch({ type: 'ADD', payload: expenseData })
  }

  const deleteExpense = (id) => {
    dispatch({ type: 'DELETE', payload: id })
  }

  const updateExpense = (id, expenseData) => {
    dispatch({
      type: 'UPDATE',
      payload: {
        id,
        data: expenseData,
      },
    })
  }

  const value = {
    expenses: expensesState,
    addExpense,
    updateExpense,
    deleteExpense,
  }

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider

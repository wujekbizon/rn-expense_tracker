import { useContext, useEffect, useState } from 'react'
import { LayoutWrapper, ExpensesOutput, LoadingOverlay, ErrorOverlay } from '../components'
import { ExpensesContext } from '../store/expenses-context'
import { getDateMinusDays } from '../util/date'
import { fetchExpense } from '../util/apiCalls'

const RecentExpensesScreen = () => {
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState()
  const expensesCtx = useContext(ExpensesContext)
  const { expenses, setExpenses } = expensesCtx

  useEffect(() => {
    const getExpenses = async () => {
      setIsFetching(true)

      try {
        const expenses = await fetchExpense()
        setExpenses(expenses)
      } catch (error) {
        setError(`${error.message} - Could not fetch expenses!`)
      }
      setIsFetching(false)
    }
    getExpenses()
  }, [])

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date()
    const date7DaysAgo = getDateMinusDays(today, 7)
    return expense.date >= date7DaysAgo && expense.date <= today
  })

  const errorHandler = () => {
    // here we can re-fetch our data or handle this error differently

    setError(null)
  }

  return (
    <>
      {error && !isFetching ? (
        <ErrorOverlay message={error} onConfirm={errorHandler} />
      ) : (
        <LayoutWrapper>
          {isFetching ? (
            <LoadingOverlay />
          ) : (
            <ExpensesOutput
              expenses={recentExpenses}
              periodName="Last 7 Days"
              fallbackText="No expenses for the last 7 days."
            />
          )}
        </LayoutWrapper>
      )}
    </>
  )
}
export default RecentExpensesScreen

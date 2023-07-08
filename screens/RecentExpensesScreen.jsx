import { useContext } from 'react'
import { LayoutWrapper, ExpensesOutput } from '../components'
import { ExpensesContext } from '../store/expenses-context'
import { getDateMinusDays } from '../util/date'

const RecentExpensesScreen = () => {
  const expensesCtx = useContext(ExpensesContext)
  const { expenses } = expensesCtx

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date()
    const date7DaysAgo = getDateMinusDays(today, 7)
    return expense.date >= date7DaysAgo && expense.date <= today
  })

  return (
    <LayoutWrapper>
      <ExpensesOutput
        expenses={recentExpenses}
        periodName="Last 7 Days"
        fallbackText="No expenses for the last 7 days."
      />
    </LayoutWrapper>
  )
}
export default RecentExpensesScreen

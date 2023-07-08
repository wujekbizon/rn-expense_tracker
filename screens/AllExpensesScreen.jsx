import { useContext } from 'react'
import { LayoutWrapper, ExpensesOutput } from '../components'
import { ExpensesContext } from '../store/expenses-context'

const AllExpensesScreen = () => {
  const expensesCtx = useContext(ExpensesContext)
  const { expenses } = expensesCtx
  return (
    <LayoutWrapper>
      <ExpensesOutput expenses={expenses} periodName="Total" fallbackText="No expenses , buy something :)" />
    </LayoutWrapper>
  )
}
export default AllExpensesScreen

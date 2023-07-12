import { useLayoutEffect, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton, LayoutWrapper, ExpenseForm } from '../components'
import { ExpensesContext } from '../store/expenses-context'

const ManageExpenseScreen = ({ route, navigation }) => {
  const expensesCtx = useContext(ExpensesContext)
  const { deleteExpense, addExpense, updateExpense, expenses } = expensesCtx
  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId

  const editedExpense = expenses.find((expense) => expense.id === editedExpenseId)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    })
  }, [navigation, isEditing])

  const cancelPressHandler = () => {
    navigation.goBack()
  }

  const deleteExpenseHandler = () => {
    deleteExpense(editedExpenseId)
    navigation.goBack()
  }

  const confirmExpenseHandler = (expenseData) => {
    if (isEditing) {
      updateExpense(editedExpenseId, expenseData)
    } else {
      addExpense(expenseData)
    }

    navigation.goBack()
  }

  return (
    <LayoutWrapper style={styles.rootContainer}>
      <ExpenseForm
        onCancel={cancelPressHandler}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmExpenseHandler}
        defaultValues={editedExpense}
      />
      <View style={styles.removeIconContainer}>
        {isEditing && <IconButton icon="trash" size={32} color="red" onPress={deleteExpenseHandler} />}
      </View>
    </LayoutWrapper>
  )
}
export default ManageExpenseScreen
const styles = StyleSheet.create({
  rootContainer: {
    padding: 16,
  },
  removeIconContainer: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginHorizontal: 25,
    marginVertical: 12,
  },
})

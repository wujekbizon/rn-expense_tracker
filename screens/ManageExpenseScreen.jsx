import { useLayoutEffect, useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton, LayoutWrapper, ExpenseForm, LoadingOverlay, ErrorOverlay } from '../components'
import { ExpensesContext } from '../store/expenses-context'
import { storeExpense, deleteExpenseFromDB, updateExpenseFromDB } from '../util/apiCalls'

const ManageExpenseScreen = ({ route, navigation }) => {
  const expensesCtx = useContext(ExpensesContext)
  const { deleteExpense, addExpense, updateExpense, expenses } = expensesCtx
  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState()

  const editedExpense = expenses.find((expense) => expense.id === editedExpenseId)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    })
  }, [navigation, isEditing])

  const cancelPressHandler = () => {
    navigation.goBack()
  }

  const deleteExpenseHandler = async () => {
    setIsSending(true)
    try {
      deleteExpense(editedExpenseId)
      await deleteExpenseFromDB(editedExpenseId)
      navigation.goBack()
    } catch (error) {
      setError('Could not delete expense - please try again')
      setIsSending(false)
    }
  }

  const confirmExpenseHandler = async (expenseData) => {
    setIsSending(true)
    try {
      if (isEditing) {
        updateExpense(editedExpenseId, expenseData)
        await updateExpenseFromDB(editedExpenseId, expenseData)
      } else {
        const id = await storeExpense(expenseData)
        addExpense({ ...expenseData, id })
      }
      navigation.goBack()
    } catch (error) {
      setError('Could not save data - please try again')
      setIsSending(false)
    }
  }

  return (
    <>
      {error && !isSending ? (
        <ErrorOverlay message={error} />
      ) : (
        <LayoutWrapper style={styles.rootContainer}>
          {isSending ? (
            <LoadingOverlay />
          ) : (
            <>
              <ExpenseForm
                onCancel={cancelPressHandler}
                submitButtonLabel={isEditing ? 'Update' : 'Add'}
                onSubmit={confirmExpenseHandler}
                defaultValues={editedExpense}
              />
              <View style={styles.removeIconContainer}>
                {isEditing && <IconButton icon="trash" size={32} color="red" onPress={deleteExpenseHandler} />}
              </View>
            </>
          )}
        </LayoutWrapper>
      )}
    </>
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

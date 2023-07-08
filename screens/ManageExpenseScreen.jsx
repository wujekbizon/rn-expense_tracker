import { useLayoutEffect, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton, LayoutWrapper, Button } from '../components'
import { ExpensesContext } from '../store/expenses-context'

const ManageExpenseScreen = ({ route, navigation }) => {
  const expensesCtx = useContext(ExpensesContext)
  const { deleteExpense, addExpense, updateExpense } = expensesCtx
  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId

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

  const confirmExpenseHandler = () => {
    if (isEditing) {
      const updatedExpense = {
        title: 'Another book',
        amount: 45.34,
        date: new Date(),
      }
      updateExpense(editedExpenseId, updatedExpense)
    } else {
      const newExpense = {
        title: 'New Laptop',
        amount: 349.99,
        date: new Date(),
      }
      addExpense(newExpense)
    }

    navigation.goBack()
  }

  return (
    <LayoutWrapper style={styles.rootContainer}>
      <View style={styles.btnsContainer}>
        <Button style={styles.buttonStyle} onPress={cancelPressHandler} mode="flat">
          Cancel
        </Button>
        <Button style={styles.buttonStyle} onPress={confirmExpenseHandler}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
      <View style={styles.removeIconContainer}>
        {isEditing && <IconButton icon="trash" size={32} color="red" onPress={deleteExpenseHandler} />}
      </View>
    </LayoutWrapper>
  )
}
export default ManageExpenseScreen
const styles = StyleSheet.create({
  rootContainer: {
    paddingTop: 16,
  },
  btnsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  removeIconContainer: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginHorizontal: 25,
    marginVertical: 12,
  },
})

import { StyleSheet, View, Text } from 'react-native'
import Summary from './Summary'
import ExpensesList from './ExpensesList'

const ExpensesOutput = ({ expenses, periodName, fallbackText }) => {
  return (
    <View style={styles.rootContainer}>
      <Summary title={periodName} expenses={expenses} />
      {expenses.length > 0 ? <ExpensesList data={expenses} /> : <Text style={styles.infoText}>{fallbackText}</Text>}
    </View>
  )
}
export default ExpensesOutput
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
})

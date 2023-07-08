import { StyleSheet, Text, View, Pressable, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { getFormattedDate } from '../util/date'
const ExpenseItem = ({ title, amount, date, id }) => {
  const navigatation = useNavigation()
  const humanReadableDate = getFormattedDate(date)

  const expensePressHandler = () => {
    navigatation.navigate('ManageExpenses', {
      expenseId: id,
    })
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [styles.button, Platform.OS === 'ios' && pressed && styles.btnPressed]}
        onPress={expensePressHandler}
        android_ripple={{ color: '#0e2844' }}
      >
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{humanReadableDate}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>${amount.toFixed(2)}</Text>
        </View>
      </Pressable>
    </View>
  )
}
export default ExpenseItem
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071522',
    marginVertical: 8,
    borderRadius: 5,
    elevation: 4,
    shadowColor: '#15191d',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 16,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnPressed: {
    opacity: 0.6,
  },
  infoContainer: {
    padding: 12,
  },
  title: {
    fontWeight: '700',
    fontSize: 15,
    color: '#ccc',
  },
  date: {
    color: '#ccc',
    fontWeight: '200',
    fontSize: 12,
  },
  amountContainer: {
    minWidth: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 12,
    padding: 10,
    backgroundColor: '#E74C3C',
    borderRadius: 5,
    opacity: 0.8,
  },
  amount: {
    color: '#ccc',
    fontWeight: '600',
    fontSize: 15,
  },
})

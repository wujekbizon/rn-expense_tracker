import { StyleSheet, Text, View } from 'react-native'
const Summary = ({ title, expenses }) => {
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2)

  return (
    <View style={styles.summaryContainer}>
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.total}>${totalExpenses}</Text>
    </View>
  )
}
export default Summary
const styles = StyleSheet.create({
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#c0c5cc',
    borderRadius: 5,
  },
  text: {
    color: '#5e4f45',
    fontSize: 12,
    fontWeight: '400',
  },
  total: {
    fontSize: 16,
    fontWeight: '700',
    color: '#031b34',
  },
})

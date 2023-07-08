import { StyleSheet, View, FlatList } from 'react-native'
import ExpenseItem from './ExpenseItem'

const ExpensesList = ({ data }) => {
  return (
    <View style={styles.rootContainer}>
      <FlatList data={data} keyExtractor={(item) => item.id} renderItem={({ item }) => <ExpenseItem {...item} />} />
    </View>
  )
}
export default ExpensesList
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
})

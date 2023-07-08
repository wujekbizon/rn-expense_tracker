import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ManageExpenseScreen } from '../screens'
import ExpensesOverview from './ExpensesOverview'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#071522' },
          headerTintColor: 'white',
        }}
      >
        <Stack.Screen
          name="ExpensesOverview"
          component={ExpensesOverview}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ManageExpenses"
          component={ManageExpenseScreen}
          options={{
            presentation: 'modal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default Navigation

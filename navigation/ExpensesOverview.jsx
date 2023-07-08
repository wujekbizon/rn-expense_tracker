import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { IconButton } from '../components'

const BottomTab = createBottomTabNavigator()

import { AllExpensesScreen, RecentExpensesScreen } from '../screens'

const ExpensesOverview = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: '#071522' },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: '#071522' },
        tabBarActiveTintColor: '#E74C3C',
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            color={tintColor}
            size={28}
            onPress={() => {
              navigation.navigate('ManageExpenses')
            }}
          />
        ),
      })}
    >
      <BottomTab.Screen
        name="RecentExpenses"
        component={RecentExpensesScreen}
        options={{
          headerTitle: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ size, color }) => <Ionicons color={color} size={size} name="hourglass" />,
        }}
      />
      <BottomTab.Screen
        name="AllExpenses"
        component={AllExpensesScreen}
        options={{
          headerTitle: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({ color, size }) => <Ionicons color={color} size={size} name="calendar" />,
        }}
      />
    </BottomTab.Navigator>
  )
}
export default ExpensesOverview

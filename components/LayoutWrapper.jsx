import { StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

const LayoutWrapper = ({ children, colors, style }) => {
  return (
    <LinearGradient style={[styles.rootScreen, style]} colors={colors ?? ['#2C3E50', '#031b34']}>
      {children}
    </LinearGradient>
  )
}
export default LayoutWrapper

const styles = StyleSheet.create({
  rootScreen: { flex: 1 },
})

import { StyleSheet, Pressable, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
const IconButton = ({ onPress, color, icon, size }) => {
  return (
    <Pressable style={({ pressed }) => pressed && styles.pressed} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} color={color} size={size} />
      </View>
    </Pressable>
  )
}
export default IconButton
const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
  iconContainer: {
    borderRadius: 24,
    padding: 6,
    margin: 8,
  },
})

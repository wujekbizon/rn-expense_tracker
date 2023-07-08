import { StyleSheet, Text, Pressable, View } from 'react-native'

const Button = ({ onPress, children, mode, style }) => {
  return (
    <View style={style}>
      <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
        <View style={[styles.button, mode === 'flat' && styles.flat]}>
          <Text style={[styles.btnText, mode === 'flat' && styles.flatText]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  )
}
export default Button
const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#071522',
  },
  flat: {
    backgroundColor: 'transparent',
  },
  btnText: {
    color: '#ccc',
    textAlign: 'center',
  },
  flatText: {
    color: 'white',
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
})

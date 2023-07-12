import { StyleSheet, Text, View, TextInput } from 'react-native'
const Input = ({ label, textInputConfig, style, invalid }) => {
  const isMultiline = textInputConfig?.multiline

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
      <TextInput
        {...textInputConfig}
        style={[styles.input, isMultiline && styles.inputMultiline, invalid && styles.invalidInput]}
      />
    </View>
  )
}
export default Input
const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginTop: 8,
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: '#ccc',
    marginBottom: 4,
  },
  invalidLabel: {
    color: 'red',
  },
  input: {
    backgroundColor: '#c0c5cc',
    padding: 6,
    borderRadius: 6,
    color: '#031b34',
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidInput: {
    borderColor: 'red',
    borderWidth: 1,
    backgroundColor: '#ffc1c1',
  },
})

import { useState } from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import Input from './Input'
import Button from './Button'
import { getFormattedDate } from '../util/date'

const ExpenseForm = ({ onCancel, submitButtonLabel, onSubmit, defaultValues }) => {
  const [inputs, setInputs] = useState({
    amount: { value: defaultValues ? defaultValues.amount.toString() : '', isValid: true },
    date: { value: defaultValues ? getFormattedDate(defaultValues.date) : '', isValid: true },
    description: { value: defaultValues ? defaultValues.description : '', isValid: true },
  })

  const inputChangedHandler = (inputIdentifier, enteredValue) => {
    setInputs((prevValues) => {
      return {
        ...prevValues,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      }
    })
  }

  const submitFormHandler = () => {
    const expenseData = {
      amount: parseFloat(inputs.amount.value),
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    }

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date'
    const descriptionIsValid = expenseData.description.trim().length > 0

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((prevValues) => {
        return {
          amount: { value: prevValues.amount.value, isValid: amountIsValid },
          date: { value: prevValues.date.value, isValid: dateIsValid },
          description: { value: prevValues.description.value, isValid: descriptionIsValid },
        }
      })
      return
    }

    onSubmit(expenseData)
  }

  const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.topContainer}>
        <Input
          style={styles.input}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: (enteredValue) => inputChangedHandler('amount', enteredValue),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.input}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            placeholderTextColor: 'grey',
            maxLength: 10,
            onChangeText: (enteredValue) => inputChangedHandler('date', enteredValue),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: (enteredValue) => inputChangedHandler('description', enteredValue),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && <Text style={styles.errorText}>Invalid input values - please check your entered data!</Text>}
      <View style={styles.btnsContainer}>
        <Button style={styles.buttonStyle} onPress={onCancel} mode="flat">
          Cancel
        </Button>
        <Button style={styles.buttonStyle} onPress={submitFormHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  )
}
export default ExpenseForm
const styles = StyleSheet.create({
  formContainer: {
    marginTop: 40,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginVertical: 24,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    paddingBottom: 12,
    fontWeight: '300',
  },
  btnsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    minWidth: 120,
    marginHorizontal: 8,
  },
})

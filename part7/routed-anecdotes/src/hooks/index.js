import { useState } from "react"

export const useField = name => {
  const [field, setField] = useState('')

  const onChange = (event) => {
    setField(event.target.value)
  }

  const onReset = () => {
    setField('')
  }

  return [{
    name,
    value: field,
    onChange
  }, 
    onReset
  ]
}
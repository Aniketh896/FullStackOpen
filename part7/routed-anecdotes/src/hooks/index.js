import { useState } from "react"

export const useField = name => {
  const [field, setField] = useState('')

  const onChange = (event) => {
    setField(event.target.value)
  }

  return {
    name,
    value: field,
    onChange
  }
}
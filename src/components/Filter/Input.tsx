import React, { useState } from 'react'
import styled from 'styled-components'
import { FilterProps } from '../../typings'

const InputWrapper = styled.div`
  display: flex;
`

const Input: React.FC<FilterProps> = ({
  id,
  filterValue,
  handleFilter = () => {},
}) => {
  const [value, setValue] = useState<string>(filterValue || '')

  const handleChange = (key: string, val: string) => {
    setValue(val)
    handleFilter({
      key,
      value: val,
    })
  }

  return (
    <InputWrapper>
      <input
        autoComplete="off"
        name={id}
        type="text"
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        value={value}
      />
      {value.length > 0 && (
        // eslint-disable-next-line
        <button onClick={() => handleChange(id, '')}>❌️</button>
      )}
    </InputWrapper>
  )
}

export default Input

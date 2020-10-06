import React from 'react'
import { FilterProps } from '../../typings'
import { Dropdown, DropdownContent } from './Dropdown'
import Input from './Input'

const Filter: React.FC<FilterProps> = ({
  id,
  handleFilter = () => {},
  children,
  filterValue,
}) => (
  <Dropdown>
    {children}
    {'  '}🔍️
    <DropdownContent>
      <Input id={id} handleFilter={handleFilter} filterValue={filterValue} />
    </DropdownContent>
  </Dropdown>
)

export default Filter

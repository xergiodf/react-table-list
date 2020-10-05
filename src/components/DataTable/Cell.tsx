import React from 'react'
import { KeyValue } from '../../typings'
import Filter from '../Filter'

type CellProps = {
  keyId: string
  filters?: string[]
  handleFilter?: (filter: KeyValue) => void
  isHeader?: boolean
  onClick?: () => void
}

const Cell: React.FC<CellProps> = ({
  keyId,
  filters = [],
  handleFilter = () => {},
  isHeader = false,
  children,
  onClick = () => {},
}) => {
  return isHeader ? (
    <th onClick={onClick}>
      {filters.length > 0 && filters.includes(keyId) ? (
        <Filter id={keyId} handleFilter={handleFilter}>
          {children}
        </Filter>
      ) : (
        <>{children}</>
      )}
    </th>
  ) : (
    <td>{children}</td>
  )
}

export default Cell

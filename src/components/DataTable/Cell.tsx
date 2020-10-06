import React from 'react'
import { KeyValue } from '../../typings'
import Filter from '../Filter'

type CellProps = {
  keyId: string
  filters?: string[]
  handleFilter?: (filter: KeyValue) => void
  currentFilters?: KeyValue[]
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
  currentFilters = [],
}) => {
  return isHeader ? (
    <th onClick={onClick}>
      {filters.length > 0 && filters.includes(keyId) ? (
        <Filter
          id={keyId}
          handleFilter={handleFilter}
          filterValue={currentFilters.find((f) => f.key === keyId)?.value || ''}
        >
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

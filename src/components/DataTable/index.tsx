import React, { useState } from 'react'
import styled from 'styled-components'
import { ColumnDefinition, KeyValue } from '../../typings'
import Cell from './Cell'
import { Table, TableHead, TableBody } from './Table'

type DataTableProps = {
  data?: any[]
  filters?: string[]
  columnsDef: ColumnDefinition[]
  sortBy?: string
}

const Wrapper = styled.div`
  margin: 50px;
`

const DataTable: React.FC<DataTableProps> = ({
  sortBy,
  filters = [],
  columnsDef,
  data = [],
}) => {
  const keys = columnsDef.map((c) => c.key)
  const sortKey = sortBy || keys[0]

  const [asc, setAsc] = useState<boolean>(true)
  const [currentFilters, setCurrentFilters] = useState<KeyValue[]>(
    filters.map((f) => ({ key: f, value: '' }))
  )

  // Desc by default
  let bodyData = data.sort((a, b) => (a[sortKey] > b[sortKey] ? -1 : 1))
  if (asc) bodyData = bodyData.reverse()

  // Filter
  bodyData = bodyData.filter((row) => {
    return currentFilters.every((filter) =>
      row[filter.key]
        .toString()
        .toLowerCase()
        .includes(
          String(
            currentFilters.find((f) => f.key === filter.key)?.value
          ).toLowerCase()
        )
    )
  })

  const handleFilter = (filter: KeyValue) => {
    setCurrentFilters(
      currentFilters.map((f) => {
        if (f.key === filter.key) return filter
        return f
      })
    )
  }

  return (
    <Wrapper>
      <Table>
        <TableHead>
          <tr>
            {keys.map((key) => (
              <Cell
                key={`head-${key}`}
                keyId={key}
                isHeader
                onClick={() => {
                  if (key === sortKey) setAsc(!asc)
                }}
                filters={filters}
                handleFilter={handleFilter}
              >
                {columnsDef.find((c) => c.key === key)?.label}{' '}
                {key === sortKey && <>{asc ? '🔺️' : '🔻️'}</>}
              </Cell>
            ))}
          </tr>
        </TableHead>
        <TableBody>
          {bodyData.map((row, i) => (
            <tr key={`row-${i}`}>
              {keys.map((key) => {
                const colDef = columnsDef.find((c) => c.key === key)
                const value = colDef?.render(row[key]?.toString())
                const extraClass =
                  (colDef?.className &&
                    colDef?.className(row[key]?.toString())) ||
                  ''

                return (
                  <Cell keyId={key} key={`cell-${key}-${i}`}>
                    <span className={extraClass}>{value}</span>
                  </Cell>
                )
              })}
            </tr>
          ))}
          {bodyData.length === 0 && (
            <tr>
              <td colSpan={keys.length}>No data available</td>
            </tr>
          )}
        </TableBody>
      </Table>
    </Wrapper>
  )
}

export default DataTable

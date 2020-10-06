import React, { useState } from 'react'
import qs from 'query-string'
import styled from 'styled-components'
import { ColumnDefinition, KeyValue } from '../../typings'
import Cell from './Cell'
import { Table, TableHead, TableBody } from './Table'

type DataTableProps = {
  data?: any[]
  filters?: string[]
  onFilter?: (filter: string) => void
  selectedFilters?: string
  columnsDef: ColumnDefinition[]
  sortBy?: string
  sortDir?: string
  onSort?: (value: string) => void
}

const Wrapper = styled.div`
  margin: 50px;
`

const DataTable: React.FC<DataTableProps> = ({
  sortBy,
  filters = [],
  columnsDef,
  data = [],
  onSort = (value) => {},
  sortDir,
  onFilter = (key) => {},
  selectedFilters = '',
}) => {
  const keys = columnsDef.map((c) => c.key)
  const sortKey = sortBy || keys[0]
  const parsedFilters = qs.parse(selectedFilters)
  const parsedFilterKeys = Object.keys(parsedFilters)

  const [asc, setAsc] = useState<boolean>(sortDir !== 'DESC')
  const [currentFilters, setCurrentFilters] = useState<KeyValue[]>(
    filters.map((f) => {
      if (parsedFilterKeys.includes(f))
        return { key: f, value: parsedFilters[f] as string }

      return { key: f, value: '' }
    })
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

  /**
   *  On every filter change, triggers an
   *  update to the filters state and pass
   *  the stringified params to the callback
   */
  const handleFilter = (filter: KeyValue) => {
    const newFilters = currentFilters.map((f) => {
      if (f.key === filter.key) return filter
      return f
    })
    setCurrentFilters(newFilters)
    onFilter(
      qs.stringify(
        newFilters
          .filter((f) => f.value.length > 0)
          .reduce(
            (acc, cur) => Object.assign(acc, { [cur.key]: cur.value }),
            {}
          )
      )
    )
  }

  /**
   * On sortDir change state and trigger
   * the query param update
   */
  const handleSort = () => {
    onSort((!asc && 'ASC') || 'DESC')
    setAsc(!asc)
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
                  if (key === sortKey) handleSort()
                }}
                filters={filters}
                handleFilter={handleFilter}
                currentFilters={currentFilters}
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

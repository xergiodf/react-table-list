import React, { useState } from 'react'
import { KeyValue } from '../../typings'
import Cell from './Cell'

type TableProps = {
  data?: any[]
  filters?: string[]
  sortBy?: string
}

const Table: React.FC<TableProps> = ({ sortBy, filters = [], data = [] }) => {
  const keys = Object.keys(data[0])
  const sortKey = sortBy || keys[0]

  const [asc, setAsc] = useState<boolean>(false)
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
    <table>
      <thead>
        <tr>
          {keys.map((key) => (
            <Cell
              key={`head-${key}`}
              isHeader
              onClick={() => {
                if (key === sortKey) setAsc(!asc)
              }}
              highlight={key === sortKey}
            >
              {key.replace('_', ' ')}
            </Cell>
          ))}
        </tr>
        {filters && filters.length > 0 && (
          <tr>
            {keys.map((key) =>
              filters.includes(key) ? (
                <td key={`filter-${key}`}>
                  <input
                    name={key}
                    type="text"
                    onChange={(e) => {
                      handleFilter({
                        key: e.target.name,
                        value: e.target.value,
                      })
                    }}
                  />
                </td>
              ) : (
                <td key={`filter-${key}`} />
              )
            )}
          </tr>
        )}
      </thead>
      <tbody>
        {bodyData.map((row, i) => (
          <tr key={`row-${i}`}>
            {keys.map((key) => (
              <Cell key={`cell-${key}-${i}`}>{row[key].toString()}</Cell>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table

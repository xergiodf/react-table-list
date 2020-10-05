import React from 'react'

type CellProps = {
  highlight?: boolean
  isHeader?: boolean
  onClick?: () => void
}

const Cell: React.FC<CellProps> = ({
  isHeader = false,
  children,
  onClick = () => {},
}) => {
  return isHeader ? <th onClick={onClick}>{children}</th> : <td>{children}</td>
}

export default Cell

import styled from 'styled-components'

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  font-size: 0.9rem;
  color: ${(props) => props?.theme?.colors?.primary};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: rgba(100, 109, 130, 0.1) 0px 0px 1px 0px,
    rgba(100, 109, 130, 0.14) 0px 4px 10px 0px;
  text-align: center;
`

export const TableHead = styled.thead`
  & tr {
    background-color: ${(props) => props?.theme?.colors?.backgroundAlt};
    color: #dddddd;
    font-weight: 700;
    text-transform: capitalize;
    cursor: pointer;
    border-bottom: 1px solid #cccccc;

    & th,
    td {
      padding: 12px 15px;
    }
  }

  & input {
    font-weight: 700;
    border: 1px solid #cccccc;
    border-radius: 10px;
    padding: 4px;
    width: 80%;
    outline-width: 0;
  }
`

export const TableBody = styled.tbody`
  & tr {
    border-bottom: 1px solid #dddddd;

    & th,
    td {
      padding: 12px 15px;

      & .alert {
        color: ${props => props?.theme?.colors?.alert}
      }
    }
  }

  & tr:nth-of-type(2n) {
    background-color: ${(props) => props?.theme?.colors?.background};
  }

  & tr:hover {
    transition: 0.3s;
    color: #457b9d;
  }
`

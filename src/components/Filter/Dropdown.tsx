import styled from 'styled-components'

export const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: white;
  min-width: 10rem;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 10;
`

export const Dropdown = styled.div`
  position: relative;
  display: inline-block;

  &:hover ${DropdownContent} {
    display: block;
  }
`

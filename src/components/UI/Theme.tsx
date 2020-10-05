import React from "react"
import { ThemeProvider } from "styled-components"

const theme = {
  colors: {
    background: "#b3d4fc",
    backgroundAlt: "#457b9d",
    primary: "rgb(16, 42, 67)",
    secondary: "rgb(141, 237, 45)",
    alert: "#e63946",
  },
}

const Theme: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

export default Theme

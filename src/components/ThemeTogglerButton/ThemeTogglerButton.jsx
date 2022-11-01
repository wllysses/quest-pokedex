import React, { useContext } from "react"
import { ThemeContext, themes } from "../../contexts/theme-context"
import styled from 'styled-components'

export default function ThemeTogglerButton() {

    const { theme, setTheme } = useContext(ThemeContext)

    function handleThemeChange() {
        setTheme(theme === themes.light ? themes.dark : themes.light)
    }

    return (
        <Button onClick={handleThemeChange}>Switch color</Button>
    )
}

const Button = styled.button`
    background-color: white;
    padding: 10px;
    color: #292929;
    cursor: pointer;
    border-radius: 5px;
    border: 2px solid #292929;
`
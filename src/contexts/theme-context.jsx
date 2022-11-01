import React, { createContext } from "react";
import { useState } from "react";

export const themes = {

    light: {
        color: '#000',
        background: '#F7F7F7',
        border: '##F7F7F7'
        
    },
    dark: {
        color: '#fff',
        background: '#292929',
        border: '#292929'
    }
}

export const ThemeContext = createContext({})

export const ThemeProvider = (props) => {

    const [theme, setTheme] = useState(themes.light)
    
    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}
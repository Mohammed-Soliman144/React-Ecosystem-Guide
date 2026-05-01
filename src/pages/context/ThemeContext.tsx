import {createContext, useContext} from "react"

// A- types of Context
export const DEFAULT_THEME = "LIGHT_THEME"
export type themeType = "LIGHT_THEME" | "DARK_THEME"
export interface themeInterface {
    theme: themeType,
    toggleTheme: () => void,
}

// B- Create Context
export const ThemeContext = createContext<themeInterface | undefined>(undefined)


// C- use Context
export const useTheme = () => {
    const context = useContext(ThemeContext)
    if(!context) throw new Error("useTheme must be used within a ThemeProvider");
    return context
}
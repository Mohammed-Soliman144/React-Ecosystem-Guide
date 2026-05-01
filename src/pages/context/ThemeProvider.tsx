import {ThemeContext, type themeType, DEFAULT_THEME } from "./ThemeContext"
import {useState, useEffect, useCallback, useMemo} from "react"

// A- Create ContextProvider accepts children as React.ReactNode
export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
    const [theme, setTheme] = useState<themeType>(() => {
        // Read Theme From window.localStorage
        if(typeof window === "undefined") return DEFAULT_THEME
        try {
            const savedTheme = window.localStorage.getItem("theme") as themeType
            return savedTheme? JSON.parse(savedTheme) : DEFAULT_THEME
        } catch(err) {
            console.error(`LocalStorage Read failed ${err instanceof Error ? err.message : err}`)
            return DEFAULT_THEME
        }
    })

    // toggle theme and memories function
    const toggleTheme = useCallback(() => {
        setTheme(prev => prev === DEFAULT_THEME ? "DARK_THEME" : DEFAULT_THEME)
    }, [])

    // Write theme selected in localStorage
    useEffect(() => {
        if(typeof window === "undefined") return
        try {
            window.localStorage.setItem("theme", JSON.stringify(theme))

            // Change styles from dark to light and vice verse for css
            const root = document.documentElement
            
            // clear previous dark or ligth theme
            root.classList.remove("dark","light")
            // remove dark if theme light
            if(theme === DEFAULT_THEME)
                root.classList.remove("dark")
            // add dark if theme dark
            else
                root.classList.add("dark")
        } catch(err) {
            console.error(`LocalStorage write failed ${err instanceof Error ? err.message : err }`)
        }
    }, [theme])

    // memories values of theme and toggleTheme as object as themeInterface by useMemo
    const value = useMemo(() => ({theme, toggleTheme}), [theme, toggleTheme])

    return <ThemeContext.Provider value={value}>
        {children}
    </ThemeContext.Provider>
}
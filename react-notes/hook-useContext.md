# What is context in React
1. Context is a broadcast that can accepts props, states and derived states and passing it between the whole App function component.
2. Context is solve props drilling issue, as general rule in React ecosystem when passing props to child component, in each time parent component renders all child component also renders even the component does not use props or states passing to it. (child component as messanger component).
3. Context prevent from rendering all child from rendering one passing props to specific child component only this component is rendering.
4. context hook contains two parts one is ComponentContext.Provider that accepts props, states and derived states by using createContext hook.
5. context hook second part is useContext which can destructuring all value inside ComponentContext.Provider and consume this value from any component by using useContext hook.
6. best practice wraps App Component inside ComponentProvider to can access easily of value from any component as child for ComponentProvider.
7. Context Hook is created for transfer data (props, states etc.) between the whole App Components for only specific 4 operations (best practice):
   1. use useContext Hook for user preferences (like theme preferences, language preferences, settings preferences, authentication data)

## Context Hook Syntax
```js  
// ContextName.tsx
import {createContext, useContext} from "react"

export interface contextInterface {
    // datatype of props, states and derived states providing as value
    state: datatype,
    handleState: () => void
}

export const ContextName = createContext<contextInterface | undefined>(undefined)

export const useContextName = () => {
    const context = useContext(ContextName);
    // use => use feature from react to use Context is as (use === useContext)
    // const context = use(ContextName);
    if(!context) throw new Error("Must use useContextName within a ContextProvide")
    return context
}
``` 

```js
// ContextProvider.tsx
import {useState, ContextName, useCallback, useMemo, type contextInterface} from "./contexts/ContextName.tsx"

export const ContextProvider = ({children}: {children: React.ReactNode}) => {
    const [state, setState] = useState<datatype>(valOfDatatype);

    const handleState = useCallback(() => {
        setState(prev => !prev);
    }, [])

    const value = useMeme(() => ({state, handleState}), [state, handleState])
    return <ContextProvider.Provider value={value}>
        {children}
    <ContextProvider.Provider>
}
```

```js
// main.tsx
import React, {createRoot} from "react"
import {ContextProvider} from "./contexts/ContextProvider.tsx"

const root = document.getElementById("rootSelector")!;

createRoot(root).render(
    <React.Fragment>
        <React.StrictMode>
            <ContextProvider>
                <App />
            </ContextProvider>
        </React.StrictMode>
    </React.Fragment>
)
```
```js 
// inside any childComponent useContext
import {useContextName} from "./contexts/ContextName.tsx"

export const ChildComponent = () => {
    const {state, handleState} = useContextName();
    return <div className="container">
        <h2>{state}</h2>
        <button type="button" onClick={handleClick}>Click</button>
    </div>
}
```

## Example on Context Hook:
1. ThemeContext:
```js
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
```
2. ThemeProvider
```js
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
```
3- Using useTheme
```js
import { useTheme } from "./ThemeContext";

export const UsetPreferences = () => {
    // destructuring theme and toggleTheme as object from useTheme
    const {theme, toggleTheme} = useTheme();

    return <div className="container">
        <h2 className="text-primary bg-secondary text-base font-extrabold">{theme}</h2>
        <button className="outline-none text-primary bg-secondary  p-2 rounded-md text-base font-bold" type="button" onClick={toggleTheme}>Toggle Theme</button>
    </div> 
}
```
4- wrapping App Component inside ThemeProvider
```js
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './pages/context/ThemeProvider.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider>
        <App className="bg-primary text-primary-text"/>
      </ThemeProvider>
  </StrictMode>,
)
```
5- modifying css
```css
@import "tailwindcss";

/* select all nested element of html tag has dark class by using @custom-variant */
@custom-variant dark (&:where(.dark, .dark *));

@theme {
  /* Default ligth mode */
  --color-primary: #ffffff;
  --color-secondary: #000000;
}

:root {
  background-color: var(--color-primary);
  color: var(--color-secondary);
  /* override on light mode theme variabels by dark mode theme variables use @variant */
  @variant dark {
    --color-primary: #000000;
    --color-secondary: #f4f4f8;
  }
}

@layer base {
  body {
    background-color: var(--color-primary);
    color: var(--color-secondary);
    @apply transition-colors duration-700;
  }
}
```
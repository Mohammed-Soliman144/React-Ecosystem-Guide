import { useTheme } from "./ThemeContext";

export const UsetPreferences = () => {
    // destructuring theme and toggleTheme as object from useTheme
    const {theme, toggleTheme} = useTheme();

    return <div className="container">
        <h2 className="text-primary bg-secondary text-base font-extrabold">{theme}</h2>
        <button className="outline-none text-primary bg-secondary  p-2 rounded-md text-base font-bold" type="button" onClick={toggleTheme}>Toggle Theme</button>
    </div> 
}
import { useState, useCallback, useMemo } from "react"

/**
 * useInput - track and control form input from different type
 * @param {string} initial - default = ""
 * @returns {ReturnType} object - {bind, handleChange, handleReset} and bind: {value, onChange}
 * @example
 * const {bind, handleChange, handleReset} = useInput(initial: string = "")
*/

export const useInput = (initial: string = "") => {
    const [value, setValue] = useState(initial)

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
            setValue(e.target.value)
        }, [])

    const bind = useMemo(()=> ({value, onChange}), [value, onChange])

    const handleChange = useCallback((e: React.MouseEvent<HTMLButtonElement>, val: string)=> {
        e.preventDefault()
        setValue(val)
    }, [])

    const handleReset = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault() 
        setValue("")
    }, [])

    return {bind, handleChange, handleReset}
}
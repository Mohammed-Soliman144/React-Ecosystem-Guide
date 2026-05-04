/* toggles a boolean: true ↔ false
like a light switch on/off */

import {useState, useCallback} from "react"

/**
 * useToggle - switch boolean state easily
 * @param {boolean} initialState - default = false
 * @return {ReturnType} array - [state, handleToggle, setTrue, setFalse]
 * @example
 * const [state, handleToggle, setTrue, setFalse] = useToggle(initialState: boolean = false)
*/
export const useToggle = (initialState: boolean = false) => {
    const [state, setState] = useState<boolean>(initialState)

    const handleToggle = useCallback(() => {
        setState(prev => !prev)
    }, [])

    const setTrue = useCallback(() => {
        setState(true)
    }, [])

    const setFalse = useCallback(() => {
        setState(false)
    }, [])

    return [state, handleToggle, setTrue, setFalse] as const
}
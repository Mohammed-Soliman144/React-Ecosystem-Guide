import {useEffect, useRef, useCallback} from "react"

/**
 * useClickOutside - detect if user click outside element execute your state
 * @param {() => void} callback - that wraps your state and executed when user click outside element
 * @returns {ReturnType <T extends HTMLElement = HTMLDivElement>} elementRef as generic type must be HTMLElement and default value is HTMLDivElement - that control of element which can access and attach events to it (imperative)
 * @example 
 * const elementRef = useClickOutside<T extends HTMLElement = HTMLDivElement>(callback: () => void):T 
 */


export function useClickOutside<T extends HTMLElement = HTMLDivElement>(callback: ()=> void) {
    const elementRef = useRef<T | null>(null)
    const callbackRef = useRef<()=> void>(callback)
    
    // 1- Sync ref immediately after component rerender or callback changes
    useEffect(()=> {
        callbackRef.current = callback
    }, [callback])

    // 2- handleClickOutside logic
    const handleClickOutside = useCallback((e: MouseEvent | TouchEvent) => {
        if(elementRef.current && !elementRef.current.contains(e.target as Node))
            callbackRef.current()
    }, [])

    // 3- attach listener and subscription for document - cleanup
    useEffect(()=> {
        // TouchEvent and MouseEvent relate DOM
        document.addEventListener("mousedown", handleClickOutside)
        document.addEventListener("touchstart", handleClickOutside)

        // Cleanup
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("touchstart", handleClickOutside)
        }
    }, [handleClickOutside])

    return elementRef
}


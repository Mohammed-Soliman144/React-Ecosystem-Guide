import {useEffect, useRef, useCallback} from "react"

/**
 * useDebouce - delay update state after specific delay time
 * @param {<T extends (...args: any[]) => void>} callbackFn - accepts setter State as callback function
 * @param {number} delay - delay time in milleseconds default 500ms
 * @returns {ReturnType} - callbackFn which can wraps your setter state inside its and delay execution
 * @example
 * const handleDebouce = useDebouce<T extends (...args: any[])=> void>(callbackFn: T, delay: number = 500) 
 */

export function useDebouce<T extends (...args: any[])=> void>(callbackFn: T, delay: number = 500) {
    // Create Ref of callbackFn and timer
    const callbackRef = useRef<T>(callbackFn)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    // initialize callback function to ref - as side effect (in each time callback change runs useEffect)
    useEffect(() => {
        callbackRef.current = callbackFn
    }, [callbackFn])

    // Check if timerRef is truthy value so clearTimeout - as side effect (can not set useEffect after useCallback which function its return callbackFn (to set State inside it) as void - unreachable code)
    useEffect(() => {
        return () => {
            if(timerRef.current)
                clearTimeout(timerRef.current)
        }
    }, [])

    // return callbackFn that will wrap setter state inside it and initialize timerRef - inside useCallback 
    return useCallback((...args: Parameters<T>)=> {
        // Clear previous setTimeout before start new one
        if(timerRef.current)
            clearTimeout(timerRef.current)
        timerRef.current = setTimeout(()=> {
            if(callbackRef.current)
                callbackRef.current(...args)
        }, delay)
    }, [delay])
}
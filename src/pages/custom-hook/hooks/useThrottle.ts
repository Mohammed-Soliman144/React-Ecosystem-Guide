import { useEffect, useCallback, useRef } from "react"

/**
 * useThrottle - update setter state after specific time in milleseconds
 * @param {<T extends (...params: any[])=> void>} callback - accepts callback function that wraps setter state, this callback from generic type that accepts rest parameters as array does not return any thing
 * @param {number}  delay - default 500 milleseconds
 * @returns {ReturnType} - callback function that accepts the same datatype of your state to repeat delay execution
 * @example
 * const handleThrottle = useThrottle<T extends (...params: any[])=> void>(callback:T, delay: number = 500)
*/

export function useThrottle<T extends (...params: any[])=> void>(callback: T, delay: number = 500) {
    // create refs to memorize callback, timer, lastExecuted
    const callbackRef = useRef<T>(callback)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const lastExecuted = useRef<number>(0)

    // Manage Side Effects - when attach new callback runs useEffect again
    useEffect(()=>{
        callbackRef.current = callback
    },[callback])

    // Cleanup Side Effect - timerRef
    useEffect(()=> {
        return () => {
            if(timerRef.current)
                clearTimeout(timerRef.current)
        }
    }, [])

    // Return Callback
    // calculate elapsed = Data.now() - lastExecuted.current
    // create handleCallback => A- update lastExecuted.current (now) B- clearTimeout C- Callback
    // check if elapsed >= delay => execute handleCallback now invoked
    // check if timerRef.current === null => create new setTimeOut to execute handleCallback within difference time between delay - elapsed
    return useCallback((...params: Parameters<T>)=>{
        const elapsed = Date.now() - lastExecuted.current
        const handleCallback = () => {
            lastExecuted.current = Date.now()
            if(timerRef.current){
                clearTimeout(timerRef.current)
                timerRef.current = null
            }
            callbackRef.current(...params)
        }
        if(elapsed >= delay) 
            handleCallback()
        else if(!timerRef.current)
            timerRef.current = setTimeout(handleCallback,delay - elapsed)

    },[delay])
}
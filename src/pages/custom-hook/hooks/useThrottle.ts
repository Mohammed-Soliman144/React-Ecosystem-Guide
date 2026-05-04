/* 
limits how often a function runs
example: scroll handlers (max once per 500ms)
different from debounce (fires regularly)
*/

import { useState, useEffect } from "react"

/**
 * 
*/

export function useThrottle<T>(value: T, delay: number): T {
    const [throttle, setThrottle] = useState<T>(value)

    useEffect(() => {
        const timer = setInterval(()=> {
            setThrottle(value)
        }, delay)

        return () => {
            if(timer)
                clearInterval(timer)
        }
    }, [value, delay])

    return throttle
}
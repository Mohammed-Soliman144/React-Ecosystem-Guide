import * as z from "zod"
import {useState, useEffect, useRef, useCallback} from "react"

/**
 * useLocalStorage - Presist your state across multi tabs in browser and management state easily
 * @template {(val: T | ((val: T) => T)) => void} - accepts generic type of item value and return void as React.Dispatch<React.SetStateAction<T>>
 * @param {string} key - key of item for localStorage
 * @param {T} initialValue - value of item for localStorage
 * @param {T z.ZodType<T>} schema - value datatype shape of item for localStorage
 * @returns {[state, handleSetState] as const}
 * @example
 * const [state, handleSetState] = useLocalStorage<T>(key: string, initialValue: T, schema: z.ZodType<T>)
 */

// function flatZodError(error: z.ZodError): string {
//     const flatten = error.issues.reduce((acc, err) => {
//         const path = err.path.join(".")
//         if(!acc[path])
//             acc[path] = []
//         acc[path].push(err.message)
//         return acc
//     }, {} as Record<string, string[]>)
//     return JSON.stringify(flatten)
// }

export function useLocalStorage<T>(key: string, initialValue: T, schema: z.ZodType<T>) {
    // Lazy initialization runs once at mounting - reading
    const [state, setState] = useState<T>(() => {
        if(typeof window === "undefined") return initialValue
        try {
            const item = localStorage.getItem(key)
            if(!item) {
                // set key inside localStorage by initialValue
                localStorage.setItem(key, JSON.stringify(initialValue))
                return initialValue
            }
            const validated = schema.safeParse(JSON.parse(item))

            return validated.success ? validated.data : initialValue
        } catch(err) {
            console.error(`localStorage reading error key: ${key} - error: ${err}`)
            return initialValue
        }
    })

    // memorize schema as ref at mounting
    const schemaRef = useRef<z.ZodType<T>>(schema)
    // sync latest value of schema after rerendering
    useEffect(() => {
        schemaRef.current = schema
    }, [schema])

    // memorize setState by useCallback
    const handleSetState = useCallback((value: T | ((value: T) => T)) => {
        setState(prev => {
            const newVal = value instanceof Function? value(prev) : value
            return newVal
        })
    }, [])

    // Update the same tab in browser by new value when state changes
    useEffect(()=> {
        if(typeof window === "undefined") return
        try {
            const validatedItem = schemaRef.current.safeParse(state)
            if(!validatedItem.success) return
            localStorage.setItem(key, JSON.stringify(validatedItem.data))
        } catch(err) {
            console.error(`LocalStorage writing error key: ${key} - error: ${err}`)
        }
    }, [key, state])


    // Update item across multi tabs in browser when state changes
    useEffect(()=> {
        const handleStorage = (e: StorageEvent) => {
            try {
                if(e.key === key && e.newValue) {
                    const parsedItem = JSON.parse(e.newValue)
                    const validatedItem = schemaRef.current.safeParse(parsedItem)
                    if(!validatedItem.success) return
                    // Update State by e.newValue for other tabs
                    setState(validatedItem.data)
                }
            } catch(err) {
                console.error(`LocalStorage sync error Key: ${key} - error: ${err}`)
            }
        }

        window.addEventListener("storage", handleStorage)
        return () => window.removeEventListener("storage", handleStorage)
    }, [key])


    return [state, handleSetState] as const
}
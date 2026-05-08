import * as z from "zod"
import {useReducer, useRef, useCallback, useEffect} from "react"

/**
 * useFetch - handle fetching data from api easily and manage your state
 * @param {string} url - url of fetch api as string
 * @param {extends Omit<RequestInit, 'body'>} options - options of fetch api as object {method: string, headers: object, signal: AbortSignal, body: formAnyType}
 * @param {T z.zodType<T>} schema - shema of data returned from response (the datatype shape)
 * @returns {object} - {data: T, isLoading: boolean, error: Error, refetch: () => Promise<void>, abort: ()=> Promise<void>}
 * const {data, isLoading, error, refetch, abort} = useFetch<T>(url: string, options: FetchOptions, schema: z.ZodType<T>)  
*/

interface FetchOptions extends Omit<RequestInit, 'body'> {
    body?: any
}

interface FetchState<T> {
    data: T | null,
    error: Error | null,
    success: boolean | null,
    isLoading: boolean | null,
    message: string | null
}


type actionType<T> = | {type: "PENDING"} | {type: "ERROR", payload: {error: Error, message: string}} | {type: "SUCCESS", payload: {data: T, message: string}} | {type: "RESET"}


function reducer<T>(currentState: FetchState<T>, action: actionType<T>): FetchState<T> {
    switch(action.type) {
        case "PENDING": 
            return {
                ...currentState,
                isLoading: true,
                data: null,
                error: null,
                success: null,
                message: null
            }
        case "ERROR": 
            return {
                ...currentState,
                isLoading: false,
                data: null,
                error: action.payload.error,
                message: action.payload.message,
                success: false
            }
        case "SUCCESS": 
            return {
                ...currentState,
                isLoading: false,
                data: action.payload.data,
                message: action.payload.message,
                error: null,
                success: true
            }
        case "RESET":
            return {
                data: null,
                error: null,
                isLoading: null,
                success: null,
                message: null
            }
        default: 
            return currentState
    }
}


function flattenErrors(error: z.ZodError): string {
    const flatten = error.issues.reduce((acc, err) => {
        const path = err.path.join(".")
        if(!acc[path])
            acc[path] = []
        acc[path].push(err.message)
        return acc
    }, {} as Record<string, string[]>)

    return JSON.stringify(flatten)
}


export function useFetch<T>(url: string, options: FetchOptions, schema: z.ZodType<T>) {
    const [state, dispatch] = useReducer(reducer<T>, {
        data: null,
        error: null,
        isLoading: null,
        success: null,
        message: null
    })

    const isMountedRef = useRef(true)
    const mannualController = useRef<AbortController | null>(null)
    // Persist and memorize options object as ref when mounting
    const optionsRef = useRef<FetchOptions>(options)
    // Presist and memorize options object when after rerendering as latest async value of options
    useEffect(()=> {
        optionsRef.current = options
    }, [options])

    // Reset isMountedRef when unmounting (cleanup)
    useEffect(()=> {
        return () => {
            if(isMountedRef.current) isMountedRef.current = false
        }
    }, [])

    const fetchData = useCallback(async(signal?: AbortSignal) => {
        if(isMountedRef.current)
            dispatch({type: "PENDING"})
        try {
            const response = await fetch(url, {
                ...optionsRef.current,
                headers: {
                    ...optionsRef.current.headers,
                    "content-type": "application/json"
                },
                body: optionsRef.current.method !== "GET" && optionsRef.current.body ? typeof optionsRef.current.body !== "string" ? JSON.stringify(optionsRef.current.body) : optionsRef.current.body : undefined,
                signal,
            })

            if(!response.ok) 
                throw new Error(`HTTP error - code ${response.status} and text ${response.statusText}`)

            const rawData = await response.json()

            const validatedData = schema.safeParse(rawData)

            if(!validatedData.success)
                throw new Error(`Validation error - ${flattenErrors(validatedData.error)}`)

            if(isMountedRef.current)
                dispatch({type: "SUCCESS", payload: {data: validatedData.data, message: "Successfully fetching data from API"}})
            return validatedData.data
        } catch(err) {
            // Network Error and AbortError return (if user cancel request manually or network connection return do not display message for UI)
            if(err instanceof Error && err.name === "AbortError") return;

            if(err instanceof z.ZodError){
                if(isMountedRef.current)
                    dispatch({type:"ERROR", payload: {error: err, message: `Validation error`}})
            }

            if(err instanceof Error) {
                if(isMountedRef.current)
                    dispatch({type: "ERROR", payload: {error: err, message: "Unknown error"}})
            }
        }
    }, [url, schema])

    // Memorize fetchData by wrapping it inside useCallback 
    const refetch = useCallback(async() => {
        // Cancel previous request
        if(mannualController.current)
            mannualController.current.abort()
        const controller = new AbortController()
        // set Mannual controller
        mannualController.current = controller
        // Catch any error if Promise is rejected in silent mode do not crash UI
        return fetchData(controller.signal).catch(()=> {})
    }, [fetchData])

    useEffect(()=> {
        const autoController = new AbortController()
        if(isMountedRef.current)
            fetchData(autoController.signal).catch(() => {})
        return () => {
            autoController.abort()
        }    
    }, [fetchData])

    useEffect(()=> {
        return () => {
            if(mannualController.current)
                mannualController.current?.abort()
        }
    }, [])

    const abort = useCallback(()=> {
        return mannualController.current?.abort()
    }, [])


    return {
        ...state,
        abort,
        refetch,
    }
}
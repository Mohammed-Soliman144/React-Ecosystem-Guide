import {useReducer, useEffect, useRef, useCallback} from "react"
import * as z from "zod"
/**
 * useFetch - handle fetching data from API easily and manage your state
 * @param {string} url - url that fetching data from it
 * @param {extends Omit<RequestInit, 'body'>} options - contains {method: string, headers: Record<string, string>, signal: AbortSignal}
 * @param {T ZodType<T>} schema - schema of data type return from response 
 * @returns {object} - {data, isLoading, error, refetch}
 * @example
 * const {data, isLoading, error, refetch} = useFetch<T>(url: string, options: RequestInit, schema: ZodType<T>)
 */

interface FetchOptions extends Omit<RequestInit, 'body'> {
    body?: any,
}

interface FetchState<T> {
    data: T | null,
    error: Error | null,
    isLoading: boolean
}


type actionType<T> = 
    | {type: "PENDING"}
    | {type: "ERROR", payload: Error}
    | {type: "SUCCESS", payload: T}
    | {type: "RESET"}

function reducer<T>(currentState: FetchState<T>, action: actionType<T>): FetchState<T> {
    switch(action.type){
        case "PENDING":
            return {
                ...currentState,
                data: null,
                error: null,
                isLoading: true,
            }
        case "ERROR":
            return {
                ...currentState,
                data: null,
                error: action.payload,
                isLoading: false
            }
        case "SUCCESS": 
            return {
                ...currentState,
                data: action.payload,
                error: null,
                isLoading: false
            }
        case "RESET":
            return {
                data: null,
                error: null,
                isLoading: false
            }
        default:
            return currentState
    }
}


function flattenError(error: z.ZodError){
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
        isLoading: false
    })

    const isMountedRef = useRef(true)
    const manualController = useRef<AbortController | null>(null)
    const optionsRef = useRef<FetchOptions>(options)

    useEffect(()=> {
        optionsRef.current = options
    }, [options])

    const fetchApi = useCallback(async (signal?: AbortSignal) => {
        if(isMountedRef.current)
            dispatch({type: "PENDING"})
        try {
            const response = await fetch(url, {
                ...optionsRef.current,
                headers: {
                    ...optionsRef.current.headers,
                    "content-type": "application/json"
                },
                body: typeof optionsRef.current.body !== "string"? JSON.stringify(optionsRef.current.body) : optionsRef.current.body,
                signal
            })

            if(!response.ok)
                throw new Error(`HTTP error status code ${response.status} and status text ${response.statusText}`)
            
            const rawData = await response.json()
            
            const result = schema.safeParse(rawData)

            if(!result.success)
                throw new Error(`Validation Error - ${flattenError(result.error)}`)

            if(isMountedRef.current)
                dispatch({type: "SUCCESS", payload: result.data})
        } catch(err) {
            if(err instanceof Error && err.name === "NetworkError") return
            if(err instanceof z.ZodError)
                if(isMountedRef.current)
                    dispatch({type: "ERROR", payload: new Error(`ValidationError - ${flattenError(err)}`)})
            if(err instanceof Error && err.message.includes('HTTP'))
                if(isMountedRef.current)
                    dispatch({type: "ERROR", payload: new Error(`HTTP error ${err}`)})
            if(err instanceof Error)
                if(isMountedRef.current)
                    dispatch({type: "ERROR", payload: err})
        }
    }, [url, schema])

    useEffect(()=> {
        const autoController = new AbortController()
        if(isMountedRef.current)
            // Catch error in silent
            fetchApi(autoController.signal).catch(()=> {})
            
        return () => {
            autoController.abort()
        }
    }, [fetchApi])

    useEffect(()=> {
        return () => {
            isMountedRef.current = false
        }
    }, [])

    const refetch = useCallback(()=> {
        if(manualController.current)
            manualController.current.abort()

        const controller = new AbortController()
        manualController.current = controller
        return fetchApi(controller.signal).catch(()=>{})
    }, [fetchApi])

    const abort = useCallback(()=> {
        return manualController.current?.abort()
    }, [])
    return {
        ...state,
        refetch,
        abort
    }
}
import {useRef, useReducer, useEffect, useCallback} from "react"

/**
 * useAsync - handle asyncrohous operations easily and manage your state
 * @template {T} - {data: T | null, error: Error | null, isLoading: boolean, status: "IDLE", "PENDING", "SUCCESS", "ERROR"}
 * @param {T () => Promise<T>} asyncFun - async function for example fetching data from API etc...
 * @param {boolean} [immediate=true] - to execute async function immediately or wait (lazy executing)
 * @returns {object} - {data: T, error: Error, isLoading: boolean, status: "IDLE", "PENDING", "SUCCESS", "ERROR" }
 * @example 
 * const {data, isLoading, error, execute} = useAsync<T>(asyncFun: () => Promise<T>, immediate: boolean = true)
 */

interface AsyncState<T> {
    data: T | null,
    error: Error | null,
    isLoading: boolean,
    status: "IDLE" | "PENDING" | "SUCCESS" | "ERROR"
}

type actionType<T> = 
    | {type: "RESET"} 
    | {type: "PENDING", payload: boolean}
    | {type: "SUCCESS", payload: T}
    | {type: "ERROR", payload: Error}

function reducer<T>(currentState: AsyncState<T>, action: actionType<T>): AsyncState<T> {
    switch(action.type) {
        case "PENDING": 
            return {
                ...currentState,
                status: "PENDING",
                data: null,
                error: null,
                isLoading: action.payload,
            }
        case "SUCCESS": 
            return {
                ...currentState,
                status: "SUCCESS",
                data: action.payload,
                error: null,
                isLoading: false,
            }
        case "ERROR": 
            return {
                ...currentState,
                status: "ERROR",
                data: null,
                isLoading: false,
                error: action.payload
            }
        case "RESET": 
            return {
                status: "IDLE",
                data: null,
                error: null,
                isLoading: false,
            }
        default: 
            return currentState
    }
}


export function useAsync<T>(asyncFun: () => Promise<T>, immediate: boolean = true) {
    const [state, dispatch] = useReducer(reducer<T>, {
        data: null,
        error: null,
        isLoading: false,
        status: immediate ? "PENDING" : "IDLE"
    })

    const isMounted = useRef<boolean>(true)

    const execute = useCallback( async ()=> {
        dispatch({type: "PENDING", payload: true})
        try {
            const response = await asyncFun()
            if(isMounted.current) 
                dispatch({type: "SUCCESS", payload: response})
            return response
        }catch (err) {
            if(isMounted.current)
                dispatch({type: "ERROR", payload: err instanceof Error? err : Error(String(err))})
            throw err
        }
    }, [asyncFun])

    useEffect(()=> {
        isMounted.current = true
        if(immediate)
            // catch error without crash your app in silent when mounting or execute reference change
            execute().catch(()=> {})
        return () => {
            isMounted.current = false
        }
    }, [immediate, execute])

    const reset = useCallback(()=> dispatch({type: "RESET"}), [])

    return {
        ...state,
        execute: ()=> execute(),
        reset
    }
}
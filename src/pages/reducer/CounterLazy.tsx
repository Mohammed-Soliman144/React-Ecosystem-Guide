import { useReducer, useEffect } from "react";
/* reducer function and initialState is a pure logic so separate it outside function component */
const DEFAULT_VALUE = 0;
const lazyInitialState = () => {
    /* handle your logic here - simple counter */
    if(typeof window === "undefined") 
        return DEFAULT_VALUE
    
    const savedCount = JSON.parse(localStorage.getItem("counter") ?? `${DEFAULT_VALUE}`)

    return parseInt(savedCount) ;
}


type actionType = {
    type: "INCREMENT" | "DECREMENT" | "RESET",
    payload?: number | undefined 
}

const initialState: number = DEFAULT_VALUE;

const reducer = (currentState: number , action: actionType) => {
    switch(action.type) {
        case "INCREMENT":
            return currentState + (action.payload ? action.payload : 1)
        case "DECREMENT":
            return currentState - (action.payload ? action.payload : 1)
        case "RESET":
            return initialState
        default:
            return currentState
    }
}

export const CounterLazy = () => {
    const [state, dispatch] = useReducer(reducer, initialState, lazyInitialState)

    useEffect(() => {
        if(typeof window === "undefined") return;
        localStorage.setItem("counter", state.toString())
    }, [state])
    return <div className="container">
        <h2>{state}</h2>
        <button type="button" onClick={() => dispatch({type: "INCREMENT"})}>
            Increment + 1
        </button>
        <button type="button" onClick={() => dispatch({type: "INCREMENT", payload: 10})}>
            Increment + 10
        </button>
        <button type="button" onClick={() => dispatch({type: "DECREMENT"})}>
            Decrement - 1
        </button>
        <button type="button" onClick={() => dispatch({type: "DECREMENT", payload: 10})}>
            Decrement - 10
        </button>
        <button type="button" onClick={() => dispatch({type: "RESET"})}>
            Reset
        </button>
    </div>
}
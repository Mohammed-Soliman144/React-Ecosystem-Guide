import {useReducer} from "react"

export const CounterReducer = () => {
    const initialState = 0
    const reducerCount = (currentCount: number, action: string) => {
        switch(action){
            case "Increment":
                return currentCount + 1
            case "Decrement": 
                return currentCount - 1
            case "Reset": 
                return initialState
            default:
                return currentCount;
        }
    }
    const [count, dispatch] = useReducer(reducerCount, initialState) 

    return (
        <div className="container">
            <h2>{count}</h2>
            <button type="button" onClick={() => dispatch("Increment")}>Increment</button>
            <button type="button" onClick={() => dispatch("Decrement")}>Decrement</button>
            <button type="button" onClick={() => dispatch("Reset")}>Reset</button>
        </div>
    )
}
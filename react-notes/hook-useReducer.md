
## What is useReducer Hook in React?
- useReducer depends on the core idea of array.reduce() mechanism which accumulate array of elements into one single element.
- useReducer and array.reduce() accepts two arguments which first one is reducer callback function and second one is initial value (state).
- useReducer Mechanism:
  1. accepts reducer callback function and initial state.
  2. reducer function accepts two argument which first one is currentState and second one is action.
  3. useReducer return newState and dispatch method as desturcturing array from its.
  4. useReducer Syntax:
```js
import {useReducer} from "react"
export const ComponentOne = () => {

    const initialState = value; // B
    // reducer initialize initialState to action C
    // reducer function execute action based on dispatch value
    const reducer = (currentState, action) => {
        switch(action) {
            case val1:
                yourLogicToHandleCurrentState,
            break;
            case val2:
                yourLogicToHandleCurrentState,
            break;
            case val3:
                yourLogicToHandleCurrentState,
            break;
            default: 
                yourLogicToHandleCurrentState,
        }
    }
    const [newState, dispatch] = useReducer(reducer, initialState)

    dispatch(actionValue); // A

    // ordering To execute useReducer
    /* 
        A- dispatch(actionValue) triggers reducer function to execute action based on dispatch(actionValue)
        B- reducer function initialize initialState to currentState
        C- reducer function execute action based on dispatch(actionValue)
        D- reducer function return single value in a newState
    */
}
```  
  5. Name convention and best practice for useReducer as below:-
```js
import {useReducer} from "react"

// must define reducer function and initialState outside Function Component which is a pure logic that means does not related with any states or props inside function Component and to avoid from rendering or creating from scratch in time component rerender (in most real cases reducer function contains heavy logic)
const initialState = val;

// best practice action set as object contains typeOfAction and payload as extra data for heavy logic
const reducer = (currentState: datatype, action: {type: datatype, payload: datatype}) => {
    switch(action.type) {
        case val1:
            return handleYourLogicOfPayload;
        case val2:
            return handleYourLogicOfPayload;
        case val3:
            return handleYourLogicOfPayload;
        default:
            return handleYourLogicOfPayload;
    }   
}

export const ComponentOne = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
}
```


## Summary of useReducer Hook in React (muscle memory)
1. useReducer accepts reducer as callback function and initialState as value or lazyInitialState as callback function.
2. lazyInitialState as callback function only execute once at mounting phase (first time) which useReducer passing lazyInitialState to initialState.
3. useReducer return destructuring array first newState and second dispatch as callback function.
4. reducer callback function accepts two arguments currentState as the same datatype of initialState and action object.
5. action datatype is object contains type as description what do when execute reducer function based on action.type and second is payload the data send from dispatch to reducer function. (note dispatch is void method does not return any thing).
6. datatype of initialState === datatype of newState (return from useReducer and reducer function) === datatype of currentState (argument of reducer function).
7. datatype of action === object as => {type: anyDatatype, payload: anyDatatype}.
8. datatype of arguments of dispatch function as object === datatype of action as object === {type: anyDatatype, payload: anyDatatype}.
9. best practice make action.type as constant variables with name convention upper-case CONSTANT_NAME or by using templateType in typescript like action: {type: "INCREMENT" | "DEREMENT" | 10 | 20 | true }.
10. best practice define and declare initialState and reducer callback function outside function component in React which is pure logic to avoid react life cycle (rendering) which need in each render to create reducer function and initialState from scratch which is very harmful performance and harder to debug and test for useReducer (the core idea of build its).
11. useState is specialized function build on useReducer hook.
12. useState is used for simple states from relationship between states and complexity of datatype of each state (data structure of state).
13. in all cases if states is complexed datatype like array or object with significant relationship so go direct to use useReducer hook otherwise use useState.
14. useReducer is easier than useState to debug and test with only one console.log(action) to print out action argument because reducer callback function and initialState as pure logic set outside function Component and useReducer hook.
15. useState is harder than useReducer to debug and test which all logic of its set inside useState hook its harder to debug and test because React life cycle (rendering phase).


## Exmaple one on useReducer with lazyInitialState as function only runs once at mounting phase 
```js
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
```

## Example 2 - Handle Dynamic Shopping Cart State (Complex State):
```js
import {useReducer} from "react"

// types state and action
type productsType = Array<{id: number,name: string, price: number, qty: number}>

type productType = {id: number,name: string, price: number, qty: number}

type stateType = {
    items: productsType,
    totalItems: number,
    totalAmount: number
}

type actionType = {
    type: "ADD_ITEM" | "REMOVE_ITEM" | "INCREMENT_ITEM" | "DECREMENT_ITEM" | "CLEAR_ALL",
    payload?: productType | number | undefined,
}
const initialState: stateType = {
    items: [],
    totalItems: 0,
    totalAmount: 0
}

const totalInfo = (items: productsType) => {
    const {totalItems, totalAmount} = items.reduce((acc, item) => ({
        totalItems: parseFloat((acc.totalItems + item.qty).toFixed(2)),
        totalAmount: parseFloat((acc.totalAmount + item.qty * item.price).toFixed(2))
    }),{totalItems: 0, totalAmount: 0})
    return {totalItems, totalAmount}
}

const reducer = (currentState: stateType, action: actionType) => {
    console.log(action);
    console.log(currentState)
    switch(action.type) {
        case "ADD_ITEM": 
        {   
            const itemIndex = currentState.items.findIndex(item => (typeof action.payload === "object") && item.id === action.payload.id);
            if( itemIndex  !== -1) {
                console.log("Existing Item")
                const newItems = currentState.items.map((item, index) => index ===  itemIndex? {...item, qty: item.qty + 1} : item);
                return {
                    ...currentState,
                    items: newItems,
                    totalItems: totalInfo(newItems).totalItems,
                    totalAmount: totalInfo(newItems).totalAmount,
                }
                
            } else {
                    console.log("New Item")
                    if(typeof action.payload !== "object") return currentState;
                    const newItems = [
                        ...currentState.items,
                        {...action.payload, qty: action.payload.qty + 1},
                    ];
                    return {
                    ...currentState,
                    items: newItems,
                    totalItems: totalInfo(newItems).totalItems,
                    totalAmount: totalInfo(newItems).totalAmount,
                };
            }
        }
        case "REMOVE_ITEM": 
        {
            if(typeof action.payload === "number") {
                const newItems = currentState.items.filter(item => item.id !== action.payload);
                return {
                    ...currentState,
                    items: newItems,
                    totalItems: totalInfo(newItems).totalItems,
                    totalAmount: totalInfo(newItems).totalAmount,
                }
            } 
            return currentState
        }
        case "INCREMENT_ITEM": 
        {
            if(typeof action.payload === "number") {
                const itemIndex = currentState.items.findIndex(item => item.id === action.payload);
                if( itemIndex  !== -1) {
                    const newItems = currentState.items.map((item, index) => index ===  itemIndex? {...item, qty: item.qty + 1 } : item);
                    return {
                        ...currentState,
                        items: newItems,
                        totalItems: totalInfo(newItems).totalItems,
                        totalAmount: totalInfo(newItems).totalAmount,
                    }
                }
            }
            return currentState
        }
        case "DECREMENT_ITEM": 
        {
            if(typeof action.payload === "number") {
                const itemIndex = currentState.items.findIndex(item => item.id === action.payload);
                if( itemIndex  !== -1) {
                    const newItems = currentState.items.map((item, index) => index ===  itemIndex? {...item, qty: item.qty > 1 ? item.qty - 1 : 0} : item);
                    return {
                        ...currentState,
                        items: newItems,
                        totalItems: totalInfo(newItems).totalItems,
                        totalAmount: totalInfo(newItems).totalAmount,
                    }
                }
            }
            return currentState
        }
        case "CLEAR_ALL": 
        return {
            ...currentState,
            items: initialState.items,
            totalItems: initialState.totalItems,
            totalAmount: initialState.totalAmount,
        }
        default:
            return currentState;
    }
}


export const ShoppingCardWithReducer = () => {
    const [newState, dispatch] = useReducer(reducer, initialState);
    const products = [
        {id: 1, name: "React", price: 20.99, qty: 0},
        {id: 2, name: "Next.js", price: 98.99, qty: 0},
        {id: 3, name: "TypeScript", price: 45.99, qty: 0},
    ];
    return <div className="container">
        <h2>Products</h2>
        <ul className="items">
            {
                products.map(item => {
                    return (
                        <li key={item.id}>
                            <h3>{item.name}</h3>
                            <p>{item.price}</p>
                            <button className="outline-none p-4 text-white text-base font-bold rounded-md rounded-indigo-900 bg-black cursor-pointer m-3" type="button" onClick={() => dispatch({type: "ADD_ITEM", payload: {...item} })}>Add To Card</button>
                        </li>
                    )
                })
            }
        </ul>
        <CardSummaryWithReducer newState={newState} dispatch={dispatch} /> 
    </div>
}

type propsType = {
    newState: stateType,
    dispatch: (args: actionType) => void,
}
export const CardSummaryWithReducer = ({newState, dispatch}: propsType) => {
    const {items, totalAmount, totalItems} = newState;
    return <div className="container">
        <ul>
            {
                items.map(item => item.qty > 0 &&
                        <li key={item.id}>
                            <h2>Item: {item.name} - Price ${item.price}x{item.qty}</h2>
                            <button className="outline-none p-4 text-white text-base font-bold rounded-md rounded-indigo-900 bg-black cursor-pointer m-3" type="button" onClick={() => dispatch({type: "REMOVE_ITEM", payload: item.id})}>Remove</button>
                            <button className="outline-none p-4 text-white text-base font-bold rounded-md rounded-indigo-900 bg-black cursor-pointer m-3" type="button" onClick={() => dispatch({type: "INCREMENT_ITEM", payload: item.id})}>+</button>
                            <button className="outline-none p-4 text-white text-base font-bold rounded-md rounded-indigo-900 bg-black cursor-pointer m-3" type="button" onClick={() => dispatch({type: "DECREMENT_ITEM", payload: item.id})}>-</button>
                        </li>
                    )
            }
        </ul>
        {
            totalAmount !== 0 &&
            <>
                <p className="text-black font-extrabold text-base">Total Items {totalItems}</p>
                <p className="text-black font-extrabold text-base m-3">Total Amount ${totalAmount}</p>
                <button className="outline-none p-4 text-white text-base font-bold rounded-md rounded-indigo-900 bg-black cursor-pointer m-3" type="button" onClick={() => dispatch({type: "CLEAR_ALL"})}>Clear All</button>
            </>
        }
    </div>
}
```
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
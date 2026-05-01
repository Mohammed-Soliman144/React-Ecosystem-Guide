import {useReducer} from "react"

/* products
    - addItems
    - removeItems
    - changeQuantities
    - showTotal
    - clear the entire Cart
*/

type productsType = Array<{
    id: number,
    name: string,
    price: number,
    qty: number
}>

type actionType = 
    {type: "addItem", payload: {
            id: number,
            name: string,
            price: number,
            qty: number}
    } | 
    {
        type: "removeItem",
        payload: number
    } | 
    {
        type: "incrementQty" | "decrementQty",
        payload: number
    } | 
    {
        type: "clear"  // "totalQty" | "totalPrice" |
    } 

const initialState: productsType = [
    {id: 1, name: "Macbook Air", price: 2500, qty: 0}
]

const reducer = (currentState: productsType, action: actionType) => {
    switch(action.type) {
        case "addItem":
            return [
                ...currentState,
                {...action.payload}
            ]
        case "removeItem":
            return currentState.filter(item => item.id !== action.payload)
        case "incrementQty": 
            return currentState.map(item => item.id === action.payload ? {...item, qty: item.qty + 1} : item)
        case "decrementQty": 
            return currentState.map(item => item.id === action.payload ? {...item, qty: item.qty >= 1 ? item.qty - 1 : 0} : item)
        case "clear":
            return currentState.map(item => ({...item, qty: 0}))
        default: 
            return currentState
    }
}

type formType = {
    id: number,
    name: string,
    price: number,
    qty: number
}

const initialFormState: formType = {
    id: parseInt(crypto.randomUUID()),
    name: "",
    price: 0,
    qty: 0
}

type formActionType = 
    {type: "name", payload: string} | 
    {type: "price", payload: number} | 
    {type: "qty", payload: number}  

const reducerForm = (state: formType, formAction: formActionType) => {
    switch(formAction.type) {
        case "name":
            return {
                ...state,
                name: formAction.payload,
            }
        case "price": 
            return {
                ...state,
                price: formAction.payload,
            }
        case "qty": 
            return {
                ...state,
                qty: formAction.payload,
            }
        default:
            return state
    }
}


export const ShoppingCartReducer = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [formState, dispatchForm] = useReducer(reducerForm, initialFormState)
    return <div className="container">
        <form action="" className="products">
            <label htmlFor="name">
                Product Name:
                <input type="text" id="name" placeholder="Iphone 16" value={formState.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatchForm({type: "name", payload: e.target.value})} />
            </label>
            <label htmlFor="price">
                Product Price:
                <input type="text" placeholder="1000" value={formState.price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatchForm({type: "price", payload: Number(e.target.value) ? parseInt(e.target.value) : 0 })}/>
            </label>
            <label htmlFor="qty">
                Product Qunatity:
                <input type="text" placeholder="1000" value={formState.qty} onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatchForm({type: "qty", payload: Number(e.target.value) ? parseInt(e.target.value) : 0})}/>
            </label>
        </form>
        <ul>
            {
                state.map(item => {
                    return (
                        <li key={item.id}>
                            <h2>{item.name}</h2>
                            <h2>{item.price}</h2>
                            <h2>{item.qty}</h2>
                            <button type="button" onClick={() => dispatch({type: "removeItem", payload: item.id})}>Delete</button>
                            <button type="button" onClick={() => dispatch({type: "incrementQty", payload: item.id})}>Increment Qty</button>
                            <button type="button" onClick={() => dispatch({type: "decrementQty", payload: item.id})}>Decrement Qty</button>
                        </li>
                    )
                })
            }
        </ul>
        <CartSummary products={state} handleClear={() => dispatch({type: "clear"})} handleAdd={() => dispatch({type:"addItem", payload: formState})}/>
    </div>
}



export const CartSummary = ({products, handleAdd, handleClear}: {products: productsType, handleAdd: () => void, handleClear: () => void}) => {
    const {totalQty, totalPrice} = products.reduce((acc, item) => ({
        totalQty: acc.totalQty + item.qty,
        totalPrice: acc.totalPrice + item.qty * item.price
    }), {totalQty: 0, totalPrice: 0})
    return <div className="container">
        <h2>Total Price: {totalPrice}</h2>
        <h2>Total Quantity: {totalQty}</h2>
        <button type="button" onClick={handleClear}>Clear All</button>
        <button type="button" onClick={handleAdd}>Add New Item +</button>
    </div>
}
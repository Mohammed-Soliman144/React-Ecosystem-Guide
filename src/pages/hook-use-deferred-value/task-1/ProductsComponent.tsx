import {useEffect, useReducer } from "react"

type productType = {
    id: string,
    name: string
}

type initialType = {
    products?: productType[],
    error?: string,
    loading?: boolean,
}

type actionType = {type: "FETCHING_SUCCESS", payload: productType} | {type: "FETCHING_ERROR", payload: string}  | 
{type: "FETCHING_DATA", payload: boolean} 

const initialState: initialType = {
    products: [],
    error: "",
    loading: true
}

const reducer = (currentState: initialType, action: actionType) => {
    switch(action.type) {
        case "FETCHING_DATA":
            return {
                ...currentState,
                loading: action.payload,
            }
        case "FETCHING_SUCCESS": 
            return {
                ...currentState,
                ...(currentState.products ? currentState.products?.concat(action.payload) : [action.payload]),
                loading: false,
                error: ""
            }
        case "FETCHING_ERROR": 
            return {
                ...currentState,
                loading: false,
                error: action.payload
            }
    }
}
export const ProductsComponent = ({deferredValue}: {deferredValue: string}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    

}
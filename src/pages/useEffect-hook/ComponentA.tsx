// import { useEffect, useReducer, useState } from "react"

// type stateType = {
//     name: {
//         first: string,
//         last: string
//     },
//     email: string,
//     age?: number,
// }

// type actionType = 
//     {type: "FIRST_NAME", payload: string } | {type: "LAST_NAME", payload: string } 
//     | {type: "EMAIL", payload: string} | {type: "AGE", payload: number }

// const initialState: stateType = {
//     name: {
//         first: "",
//         last: "",
//     },
//     email: "",
// }

// const reducer = (currentState: stateType, action: actionType) => {
//     switch (action.type) {
//         case "FIRST_NAME": 
//             return {
//                 ...currentState,
//                 name: {
//                     ...currentState.name,
//                     first: action.payload
//                 }
//             }
//         case "LAST_NAME": 
//             return {
//                 ...currentState,
//                 name: {
//                     ...currentState.name,
//                     last: action.payload
//                 }
//             }
//         case "EMAIL": 
//             return {
//                 ...currentState,
//                 email: action.payload
//             }
//         case "AGE": 
//             return {
//                 ...currentState,
//                 age: action.payload
//             }
//         default: 
//             return currentState
//     }
// }

// export const ComponentA = () => {
//     const [state, dispatch] = useReducer(reducer, initialState)
    
//     useEffect(() => {
//     }, [state.name.first, state.name.last, state.email, state.age])
//     return <div className="container">
//         <form action="" method="GET">
//             <label htmlFor="first">
//                 First Name:
//                 <input type="text" id="first" value={state.name.first} onChange={(e) => dispatch({type: "FIRST_NAME", payload: e.target.value})}/>
//             </label>
//             <label htmlFor="last">
//                 Last Name:
//                 <input type="text" id="last" value={state.name.last} onChange={(e) => dispatch({type: "LAST_NAME", payload: e.target.value})}/>
//             </label>
//             <label htmlFor="email">
//                 Email:
//                 <input type="email" id="email" value={state.email} onChange={(e) => dispatch({type: "EMAIL", payload: e.target.value})}/>
//             </label>
//             <label htmlFor="age">
//                 Age:
//                 <input type="number" id="first" value={state?.age} onChange={(e) => dispatch({type: "AGE", payload: Number(e.target.value)})}/>
//             </label>
//         </form>
//         <button type="button">Show State</button>
//         <ul>
//             <li>First: {state.name.first}</li>
//             <li>Last: {state.name.last}</li>
//             <li>Email: {state.email}</li>
//             <li>Age: {state.age}</li>
//         </ul>
//     </div>
// }
// import {useRef, useState, useImperativeHandle, forwardRef, useActionState} from "react"

// export type refType = {
//     moveNext: () => void,
//     moveBack: () => void,
//     setMovement: () => void
// }

// type propsType = {
//     children: React.ReactNode
// }

// type initialType = {
//     username?: string,
//     password?: string,
//     email?: string,
//     success?: boolean,
//     errors?: Record<string, string[]>,
//     visibility?: boolean
// }

// const initialState: Array<initialType> = [
//     {username: "", password: "", email: ""}
// ]

// type actionType =  {type: "ADD_ITEM", payload: initialType}

// const reducer = (currentState: Array<initialType>, action: actionType) => {
//     switch(action.type) {
//         case "ADD_ITEM": 
//             return [
//                 ...currentState,
//                 {...action.payload}
//             ]
//         default: 
//             return currentState
//     }
// }

// export const FormChild = forwardRef<refType, propsType>(({children}, ref) => {
//     // <["info", "login", "career"]>
//     const [formState, formAction, isPending] = useActionState(handleAction, initialState)
//     const [index, setIndex] = useState(0)
//     const formRef = useRef<HTMLFormElement>(null)

//     useImperativeHandle(ref, () => ({
//         moveNext: () => {
//             setIndex(prev => (prev + 1) % 3)
//         },
//         moveBack: () => {
//             setIndex(prev => ((prev - 1) + 3) % 3)
//         },
//         setMovement: () => {
//             setIndex(2)
//         }
//     }), [])

//     // ((currentIndex  + 1) % length - 1) => goNextStep
//     // ((currentIndex - 1) + length % length - 1) => goBackStep
//     console.log(state)
//     return <form action={""} method="GET" name="form" noValidate ref={formRef}>
//         <h2></h2>
//         <div className="form-controls">
//             <label htmlFor="username">
//                 Username:
//             </label>
//             <input type="text" id="username" name="username" 
//                 value={state[index].username}
//                 onChange={(e) => dispatch({type: "ADD_ITEM", payload: {username: e.target.value}})}
//                 />    
//         </div>
//         <div className="form-controls">
//             <label htmlFor="Password">
//                 Password:
//             </label>
//             <input type="Password" id="Password" name="Password"
//                 value={state[index].password}
//                 onChange={(e) => dispatch({type: "ADD_ITEM", payload: {password: e.target.value}})}
//             />    
//         </div>
//         <div className="form-controls">
//             <label htmlFor="email">
//                 Email:
//             </label>
//             <input type="email" id="email" name="email"
//                 value={state[index].email}
//                 onChange={(e) => dispatch({type: "ADD_ITEM", payload: {email: e.target.value}})}
//             />    
//         </div>
//         {children}
//     </form>
// })

// /* 
//         <div className="multi-forms" ref={containerRef}>
//         <form action="" name="info" method="GET">
//             <input type="text" name="info-input"/>
//         </form>
//         <p>{index} - {form.name[index]}</p> 
//         <p>{index} - {form[index]}</p>
//         <div className="form-submit">
//             {children}
//         </div>
//     </div>
// */
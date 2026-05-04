import * as z from "zod"
import {useReducer, useId, useRef, useEffect} from "react"

const formSchema = z.object({
    username: z.string().min(3, "username is too short").max(40, "username is too long").default(""),
    email: z.email().default(""),
    password: z.string().min(8, "password is too short").max(20, "password is too long").regex(/[0-9]{1,}/,"must contain number at least one").regex(/[a-z]{1,}/, "must contain lower chars").regex(/[A-Z]{1,}/, "must contain upper chars").regex(/[!@#$%^&*_(){}-]{1,}/, "must contain special characters !@#$%^&*_(){}-").default(""),
    success: z.boolean().optional().default(false),
    message: z.string().optional(),
    errors: z.record(z.string(), z.array(z.string())).optional()
})

type schemaType = z.infer<typeof formSchema>

type actionType = 
| {type: "NAME", payload: string} 
| {type: "EMAIL", payload: string}
| {type: "PASS", payload: string}
| {type: "SUCCESS", payload: 
    {   success: boolean, 
        message: string, 
        errors: Record<string, string[]> | undefined} }
| {type: "RESET", payload: schemaType}


const initialState: schemaType = {
    username: "",
    email: "",
    password: "",
    success: false,
    message: "",
    errors: {}
}

const reducer = (currentState: schemaType, action: actionType) => {
    switch(action.type) {
        case "NAME": 
            return {
                ...currentState,
                username: action.payload
            }
        case "EMAIL": 
            return {
                ...currentState,
                email: action.payload
            }
        case "PASS": 
            return {
                ...currentState,
                password: action.payload
            }
        case "SUCCESS": 
            return {
                ...currentState,
                success: action.payload.success,
                message: action.payload.message,
                errors: action.payload.errors
            }
        case "RESET": 
            return action.payload
        default:
            return currentState
    }
}

export const FormMainComponent = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const timerRef = useRef<number>(null)
    const id = useId()

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const result = formSchema.safeParse(state)
        if(result.success) {
            return dispatch({type: "SUCCESS", payload: {success: true, message: "Form Submit Successfully!", errors: {}}})
        }
        const flatErrors = result.error?.issues.reduce((acc, err) => {
            const path = err.path.join(".")
            if(acc[path] === undefined)
                acc[path] = []
            acc[path].push(err.message)
            return acc
        }, {} as Record<string, string[]>)
        return dispatch({type: "SUCCESS", payload: {success: false, message: "Failure Submittion", errors: flatErrors}})
    }
    useEffect(() => {
        if(state.success)
            timerRef.current = setTimeout(()=> {
                dispatch({type: "RESET", payload: initialState})
            }, 3000)
        return () => {
            if(timerRef.current !== null) 
                clearTimeout(timerRef.current)
        }
    }, [state.success])
    return <form method="POST" onSubmit={handleSubmit} noValidate aria-describedby={`${id}-form`}>
        <div className="form-controls">
            <label htmlFor={`${id}-name`}>Username: </label>
            <input type="text" id={`${id}-name`} value={state.username} onChange={(e) => dispatch({type: "NAME", payload: e.target.value})} aria-describedby={`${id}-name-error`}/>
            {!state.success && state.errors?.username && 
                state.errors?.username.map((err, idx) => {
                    return (
                        <p className="text-red-500" key={`${idx}-${err}`} id={`${id}-name-error`}>{err}</p>    
                    )
                })
            }
        </div>
        <div className="form-controls">
            <label htmlFor={`${id}-email`}>Email: </label>
            <input type="email" id={`${id}-email`} value={state.email} onChange={(e) => dispatch({type: "EMAIL", payload: e.target.value})} aria-describedby={`${id}-email-error`}/>
            {!state.success && state.errors?.email && 
                state.errors?.email.map((err, idx) => {
                    return (
                        <p key={`${idx}-${err}`} className="text-red-500" id={`${id}-email-error`}>{err}</p>  
                    )
                })
            }
        </div>
        <div className="form-controls">
            <label htmlFor={`${id}-pass`}>Password: </label>
            <input type="password" id={`${id}-pass`} value={state.password} onChange={(e) => dispatch({type: "PASS", payload: e.target.value})} aria-describedby={`${id}-pass-error`} />
            {!state.success && state.errors?.password && 
                state.errors?.password.map((err,idx) => {
                    return (
                        <p className="text-red-500" key={`${idx}-${err}`} id={`${id}-pass-error`}>{err}</p>  
                    )
                })  
            }
        </div>
        <button type="submit">submit</button>
        { (state.success || !state.success) &&
            <p  className={state.success? "text-green-500" : "text-red-500"} id={`${id}-form`}>{state.message}</p>    
        }
    </form>
}
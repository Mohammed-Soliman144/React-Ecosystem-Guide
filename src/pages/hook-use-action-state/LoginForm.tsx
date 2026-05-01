import {useActionState} from "react"
import { handleAction, type formType } from "./libs/actions/user.actions"

const initialState: formType = {
    success: undefined,
    message: "",
    errors: undefined,
    formData: undefined
}

export const LoginForm = () => {

    const [state, formAction, isPending] = useActionState(handleAction, initialState)

    return <div className="container">
        <form action={formAction} name="loginForm" method="POST">
            <div className="form-controls">
                <label htmlFor="username">
                    Username: 
                </label>
                <input type="text" id="username" name="username" />
                {
                    !state.errors?.username &&
                    <p>{state.errors?.message}</p>
                }
            </div>
            <div className="form-controls">
                <label htmlFor="email">
                    Email: 
                </label>
                <input type="email" id="email" name="email" />
                {
                    !state.errors?.email &&
                    <p>{state.errors?.email}</p>
                }
            </div>
            <div className="form-controls">
                <label htmlFor="password">
                    Password: 
                </label>
                <input type="password" id="password" name="password" />
                {
                    !state.errors?.password &&
                    <p>{state.errors?.password}</p>
                }
            </div>
            <div className="form-controls">
                <label htmlFor="confirm">
                    Confirm Password: 
                </label>
                <input type="password" id="confirm" name="confirm" />
            </div>
            <button type="submit">{isPending? "submitting...": "submit"}</button>
        </form>
        {
            !state.success &&
            <div className="">
                <p>{state.message}</p>
                <p>
                    {state?.formData?.username}
                    {state?.formData?.email}    
                    {state?.formData?.password}    
                </p>
            </div>
        }
    </div>
}
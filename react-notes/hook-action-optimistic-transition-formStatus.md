# Comparison between useReducer, useOptimistic, useActionState, useTransition and useFormStatus?

```js
// useReducer
import {useReducer, useState, useActionState, useOptimistic, useTransition} from "react"
import {useFormStatus} from "react-dom"
const [state, dispatch] = useReducer(reducer, initialState);
const reducer = (currentState: Array<{id: string, item: string}>, action: {type: string, payload: {id: string, item: string}}) => {
    switch(action.type) {
        case "ADD_ITEM":
            return [
                ...currentState,
                {...action.payload}
            ]
        default:
            return currentState;    
    }
}; 
// useOptimistic
const [state, setState] = useState(initial); 
const [optimisticState, dispatchState] = useOptimistic(state, reducerOptimistic)   
// state => original state, optimisticState => temporaryState  reducerOptimistic = (currentState, action) in spa => useOptimistic = useState + optimisticState (there is no other solution) in mpa (next.js) useOptimistic = useState + optimisticState  Or useOptimistic = useActionState + OptimisticState + revalidatePath (refetch then tell react update state) not need to useSTate; 
const [formState, formAction, isPending] = useActionState( handleFormAction, initialState) 
// when use action attribute inside form must method is POST as below
// <form action={formAction} method="POST" name="formLogin"></form>
// typeof initialState === typeof formState ; formState (shape) => {success: boolean, message: string high-level-error, errors: Record<string, string[]> all internal detail error low-level error; data: any according to your case> ; isPending => boolean within submitting true after this false; async function handleFormAction(prevState: initialState,formData: FormData) {} => typeof prevState === typeof initialState === typeof formState  ; formAction === handleFormAction then passing action attribute of form action={formAction} ;  formAction is automatic wrapper all function of handleFormAction inside startTransition if you use handleSubmit must wrap handle Server action inside startTransition to mark it as unneccessary to update in syncrohous (not handle inside batching in react also as general react is async but precise take almost 16milesecond to update not notice for human eye) ; useOptimistic => you does not need to handle ROLLBACK CASE or Failure case take it as rule optimistic State is a temporary container only for success case and add your consideration temporary container state why => because only appear within the period between potential success case and the time to execute real success case inside server and database after that react update ui by real state (useState so failure react handle it automatically and success state handle it after finish operation in server and database);
const [isPending, startTransition] = useTransition() 
// => isPending within submitting or within execute the startTransition function will be true after that false startTransition mark this state or operation not important not batching (or not wait until this operation finished then update all setState batching at once) is correct precise? is enough move on to next topic? can refine all above in md notes keep context and syntax naming and ideas?

const {pending, data, method, action} = useFormStatus()
// pending => within form submitting => true otherwise false
// method => method of form "GET" "POST"
// data => is formData from FormData
// action => method that passed to action attribute inside form

// Note when deals with formData
// const email = formData.get("inputName") as string
// const allData = Object.fromEntries(formData) as Record<string, string> // js object {key: value}
// const {username, password, email} = object.fromEntries(formData)
// formData.append("inputName", inputValue) => formData.append("id",crypto.randomUUID())
// formData.set("inputName", inputValue) => formData.set("id",crypto.randomUUID())
```
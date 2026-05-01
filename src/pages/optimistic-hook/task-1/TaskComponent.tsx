/* 
    const [state, dispatch] = useReducer(reducer, initialState) => reducer = (currentState: initialState, action: {type: literalString as constant string, payload: typeMatchState) ;  2- const [state, setState] = useState(initial); const [optimisticState, dispatchState] = useOptimistic(state, reducerOptimistic)   state => original state, optimisticState => temporaryState  reducerOptimistic = (currentState, action) in spa => useOptimistic = useState + optimisticState (there is no other solution) in mpa (next.js) useOptimistic = useState + optimisticState  Or useOptimistic = useActionState + OptimisticState + revalidatePath (refetch then tell react update state) not need to useSTate; 4- const [formState, formAction, isPending] = useActionState( handleFormAction, initialState) =>  typeof initialState === typeof formState ; formState (shape) => {success: boolean, message: string high-level-error, errors: Record<string, string[]> all internal detail error low-level error; data: any according to your case> ; isPending => boolean within submitting true after this false; async function handleFormAction(prevState: initialState,formData: FormData) {} => typeof prevState === typeof initialState === typeof formState  ; formAction === handleFormAction then passing action attribute of form action={formAction} ;  formAction is automatic wrapper all function of handleFormAction inside startTransition if you use handleSubmit must wrap handle Server action inside startTransition to mark it as unneccessary to update in syncrohous (not handle inside batching in react also as general react is async but precise take almost 16milesecond to update not notice for human eye) ; useOptimistic => you does not need to handle ROLLBACK CASE or Failure case take it as rule optimistic State is a temporary container only for success case and add your consideration temporary container state why => because only appear within the period between potential success case and the time to execute real success case inside server and database after that react update ui by real state (useState so failure react handle it automatically and success state handle it after finish operation in server and database); const {isPending, startTransition} = useTransition() => isPending within submitting true after that false startTransition mark this state or operation not important not batching (or not wait until this operation finished then update all setState batching at once) is correct precise? is enough move on to next topic? can refine all above in md notes keep context and syntax naming and ideas?
*/


import {useActionState, useOptimistic, useTransition, useState} from "react"
import { handleAction } from "./actions/task.action"
import 
    { type taskType, 
        type state, 
        type initialType, 
        type actionType,
    } from "./types/task-type"




const initialState: initialType = []

const reducerOptimistic = (currentState: initialType, action: actionType) => {
    switch(action.type) {
        case "ADD_TASK": 
            return [
                ...currentState,
                {...action.payload}
            ]
        case "ROLLBACK":
            return currentState.filter(ts => ts.id !== action.payload)
        default:
            return currentState
    }
}

const initialFormState: state = {
    success: undefined,
    message: undefined,
    errors: undefined,
    data: undefined
}

export const TaskComponent = () => {
    const [formState, formAction, pending] = useActionState(handleAction, initialFormState)
    const [state, setState] = useState<Array<taskType>>([])
    const [optimisticState, dispatchOptimistic] = useOptimistic(state, reducerOptimistic)
    const [isPending, startTransition] = useTransition()
    // console.log(state)
    // attach handleClientAction to action attribute
    const handleClientAction = async (formData: FormData) => {
        const {title} = Object.fromEntries(formData) as Record<string, string>
        // still at this point you inside browser not server crypto will work fine
        const id = Date.now().toString()

        dispatchOptimistic({type: "ADD_TASK", payload: {id, title}})

        // attach id to formData then to server
        formData.append("id", id)

        // trigger handleAction inside server as silent execution then passing formData after append id
        const result = await handleAction(undefined, formData)

        if(!result.success)
            return dispatchOptimistic({type: "ROLLBACK", payload: id})

        if(result.data)
            setState(prev => {
                return [
                    ...prev,
                    {...result.data}
                ]
            })
    }


    return <div className="container">
        <form action={handleClientAction} name="taskForm" method="POST" noValidate className="w-full flex flex-row flex-nowrap justify-start items-center gap-3">
            <div className="form-controls bg-gray-700 text-white text-md font-bold p-3 rounded-md">
                <label htmlFor="task">
                    Task:
                </label>
                <input type="hidden" name="id" />
                <input type="text" id="task" name="title"  className="ml-2 border-2 p-2 border-black rounded-md outline-none"/>
                {
                    !formState.success && formState?.errors?.title &&
                    formState?.errors?.title.map((err, idx) => {
                        return (
                            <p key={idx} className={formState.success? "text-green-500" : "text-red-500"}>
                                {err}
                            </p>
                        )
                    })
                }
            </div>
            <button type="submit" className={`text-white rounded-md p-3 font-bold text-md hover:bg-dark/80 transition-colors duration-400 cursor-pointer ${pending? "bg-gray-500" : "bg-black"}`} >{pending?  "Adding..." : "Add Task +"}</button>
            {
                formState.success &&
                <p className={formState.success? "text-green-500" : "text-red-500"}>{formState.message}</p>
            }
        </form>
        <article className="bg-amber-200 rounded-lg p-4">
            <h2 className="text-2xl font-bold text-blue-600">Your Dialy Tasks</h2>
            <ul>
                {
                    optimisticState.map(task => {
                        return (
                            <li key={task.id} className="text-blue-500">{task.title}</li>
                        )
                    })
                }
            </ul>
        </article>
    </div>
}


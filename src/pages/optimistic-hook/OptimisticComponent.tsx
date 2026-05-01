import {useState, useOptimistic, useTransition} from "react"
// import { useFormStatus } from "react-dom"

type blogType = {
    id?: string,
    comment?: string,
    isSaved?: boolean,
    isUpdated?: boolean
}


type actionType = 
    | {type: "ADD_COMMENT", payload: blogType} 
    | {type: "DELETE_COMMENT", payload: string | undefined} 
    | {type: "UPDATE_COMMENT", payload: {id: string | undefined, comment: string | undefined}}

const reducerOptimistic = (currentState: Array<blogType>, action: actionType) => {
    switch(action.type) {
        case "ADD_COMMENT":
            return [
                ...currentState,
                {...action.payload},
            ]
        case "DELETE_COMMENT":
            return currentState.filter(com => com.id !== action.payload)
        case "UPDATE_COMMENT":
            return currentState.map(com => com.id === action.payload.id ? {...com, comment: action.payload.comment} : com)
        default:
            return currentState
    }
}


export const OptimisticComponent = () => {
    const [input, setInput] = useState<{id: string | undefined, text: string | undefined}>({id: "", text: ""})
    const [comments, setComments] = useState<Array<blogType>>([])
    const [optimisticState, setOptimistic] = useOptimistic(comments, reducerOptimistic)
    const [isPending, startTransition] = useTransition()

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: string | undefined) => {
        e.preventDefault()
        if(id === undefined) return
        setOptimistic({type: "DELETE_COMMENT", payload: id})
        try {
            startTransition(async () => {
                await new Promise(resolve => setTimeout(resolve, 3000))
                setComments(prev => prev.filter(com => com.id !== id))
            })
        } catch(err) {
            console.error(`Network Error ${err}`)
        }
    }

    const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>, id: string | undefined, text: string | undefined) => {
        e.preventDefault()
        if(id === undefined) return
        
        const isUpdated = comments.find(com => com.id === id)?.isUpdated
        if(isUpdated){
            setInput(prev => {
                return {
                    ...prev,
                    id,
                    text
                }
            })
            return 
        }
            // return
        

        
        setOptimistic({type: "UPDATE_COMMENT", payload: {id, comment: input.text}})
        startTransition(async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 3000))
                // if(Math.random() < 0.4) throw new Error(`Error`)
                setComments(prev => prev.map(com => com.id === id ? {...com, comment: input.text, isUpdated: !com.isUpdated} : com))
            } catch(err) {
                console.error(`Networking Error ${err}`)
                // setState(prev => prev) no need already if happens error the new state not saved which means state still points to last state value
            } finally {
                setInput({id: "", text: ""})
            }
        })
    }

    const handleSubmit = async (formData: FormData) => {
        const textComment = input.text
        setInput({id: "", text: ""})
        if(!textComment) return

        setOptimistic({type: "ADD_COMMENT", payload: {
            id: Date.now().toString(),
            comment: textComment,
            isSaved: false,
        }})
        
        try {
            // when handleSubmittion by action attribute by automatic react wraps your handleSubmition inside startTransition to mark its as non urgent state to update but if use onSubmit Event must use startTransition
            // startTransition( async () => {
            await new Promise(resolve => setTimeout(resolve, 3000))
            // if(Math.random() < 0.4) throw new Error(`Error`)
            setComments(prev => {
                return [
                    ...prev,
                    {
                        id: crypto.randomUUID(),
                        comment: textComment,
                        isSaved: true
                    }
                ]
            })
        } catch(err) {
            console.error(`Networking Error ${err}`)
            // setState(prev => prev) no need already if happens error the new state not saved which means state still points to last state value
        }
    }

    return <div className="container h-screen">
        <form action={handleSubmit}>
            <div className="form-controls my-4 text-white bg-gray-700 w-fit p-3 rounded-md">
                <label htmlFor="comment" className="pr-2">
                    Comment: 
                </label>
                <input type="text" name="comment" id="comment" className="text-white text-lg" placeholder="type your comment" 
                    value={input.text} onChange={(e) => {
                    setInput({id: "", text: e.target.value});}} 
                />
            </div>
                <button type="submit" className="p-2 border-2 border-indigo-900 text-white bg-black text-bold rounded-md mx-2 cursor-pointer hover:bg-indigo-900 transition-colors duration-400">Add Comment</button>
        </form>
        <ul>
            { optimisticState.map((item) => {
                return (
                    <li key={item.id} className="my-2">
                        <span className={`${item.isSaved? "text-blue-800 text-xl text-extrabold pr-4" : "text-green-700"}`}>{item.isSaved? item.comment : `${item.comment} sending...`}</span>
                        <button type="button" className="p-2 border-2 border-indigo-900 text-white bg-black text-bold rounded-md mx-2 cursor-pointer hover:bg-indigo-900 transition-colors duration-400" 
                        onClick={(e) => handleDelete(e, item.id)}>Delete Item</button>
                        <button type="button" className={`p-2 border-2 border-indigo-900 text-white bg-black text-bold rounded-md mx-2 cursor-pointer hover:bg-indigo-900 transition-colors duration-400`}
                        onClick={(e) => {
                            handleUpdate(e, item.id, item.comment)
                        }}>
                            { !item.isUpdated ? "Edit Comment" : "Editing..." }
                        </button>
                    </li>
                )
                })
            }
        </ul>
    </div>
}
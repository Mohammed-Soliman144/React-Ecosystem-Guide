import {useReducer, useEffect} from "react"


interface postInterface {
    id: number | -1,
    name: string,
    email: string,
    body: string
}

type errorType = {sucess: boolean, message: string}


type stateType = {
    posts: postInterface | string | Promise<postInterface []>
    error: errorType,
    loading: boolean
}

type actionType = {
    type: "FETCH_SUCCESS" | "HTTP_ERROR" | "FETCH_ERROR" | "FETCHING_DATA",
    payload: postInterface[] | string | Promise<postInterface []>
}

const initialState: stateType = {
    posts: {
        id: -1,
        name: "",
        email: "",
        body: ""
    },
    error: {sucess: true, message: ""},
    loading: true,
}



const reducer = (currentState: stateType, action: actionType) => {
    switch(action.type) {
        case "HTTP_ERROR": 
            return {
                ...currentState,
                error: {
                    ...currentState.error,
                    sucess: false,
                    error: action.payload
                },
                loading: false
            }
        case "FETCH_ERROR": 
            return {
                ...currentState,
                error: {
                    ...currentState.error,
                    sucess: false,
                    error: "Error within fetching data from API"
                },
                loading: false
            }
        case "FETCHING_DATA":
            return {
                ...currentState,
                loading: true,
            }
        case "FETCH_SUCCESS": 
            return {
                ...currentState,
                posts: action.payload,
                error: {
                    ...currentState.error,
                    sucess: true,
                    error: ""
                },
                loading: false
            }
        default:
            return currentState
    }
}



export const FetchComponent = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    // runs only once on mounting
    useEffect(() => {
        let isMounted = true;
        try {
            if(!isMounted) return
            const fetchData = async (): Promise<postInterface> => {
                const response = await fetch("https://jsonplaceholder.typicode.com/comments", {
                    method: "GET",
                    headers: {
                        "content-type": "application/json"
                    }
                })
                if(!response.ok)
                    dispatch({type: "HTTP_ERROR", payload: `HTTP ERROR status code ${response.status} and status ${response.statusText}`}) 
                return response.json()
            } 
            const posts = fetchData() 
            dispatch({type: "FETCH_SUCCESS", payload: posts })
        } catch(err) {
            dispatch({type: "FETCH_ERROR", payload: `Error within fetching data from API ${err instanceof Error? err.message : err}`})
        }
        return () => {
            isMounted = false
        }
    }, [])

    return <div className="container">
        <ul>
            {
                state.posts
            }
        </ul>
    </div>
}
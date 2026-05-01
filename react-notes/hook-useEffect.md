# What is useEffect Hook in React?
1. useEffect is handling all side effects of external system that does not adapts with React ecosystem such:
   1. Fetching data from API Endpoint.
   2. Settings of subscription of WebSocket.
   3. Dealing with Timers like setTimeout and setInterval.
   4. Dealing with window and DOM element as syncrohous operations.
   5. cleanup handler functions before next mounting phase of component.
2. useEffect is syncrohous operation (as useRef) which means its running after function component render and after first render (mounting phase).
3. useEffect does not trigger react rerender like useState or useReducer hook.
4. useEffect contains arrow function and dependencies array as below syntax
   ```js
        import {useEffect} from "react"
        export const ComponentA = () => {

            useEffect(() => {
                // handle logic of external system that can not handle inside function component which causing memory leaks
                // like fetching data from API Endpoint if set inside function component in each component render the request data send to server that behavior will cause inifinite loop if your set state (data) inside body of fetch (browser api) and also in some cases component can rerender but still response from server does not return (memory leaking and inconsistency)
                
                // cleanup function runs only before component unmounting or before next new component render
                return () => {
                    // cleanup functions used for:
                    /* 
                        1. removeEventListener that related window.
                        2. clear timers like clearInterval and clearTimeout
                        3. stopping fetching data before component unmount to avoid memory leaks.
                        4. stop conditional more than one fetching data race
                     */
                }
            }, [])
        }
   ```
4. useEffect without dependencies array useEffect(()=> {}) that make useEffect runs after each time component rerender (bad practice in most cases)
5. useEffect with empty dependencies array useEffect(()=> {}, []) that make useEffect runs only once at mounting phase (after component render first time) and also runs return cleanup function before component unmounting and next new render of component
6. useEffect with dependencies array useEffect(() => {}, [handlerFunction, stateForPrimitive, state.key, state[index]]) in this case you tells react in each time the dependencies array change runs useEffect after render component.

 
## Example Fetching data from API EndPoint:
```js
import {useState, useEffect} from "react"

interface Iusers {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
      street: string,
      suite: string,
      city: string,
      zipcode: string,
      geo: {
        lat: string,
        lng: number
      }
    },
    phone: string,
    website: string,
    company: {
      name: string,
      catchPhrase: string,
      bs: string
    }
}

export const Users = () => {
    const [users, setUsers] = useState<Array<Iusers>>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState({success: true, error: ""})
    const [theme, setTheme] = useState("LIGHT_THEME")
    const [userId, setUserId] = useState<number>(0)

    const toggleTheme = () => {
        setTheme(prev => prev === "LIGHT_THEME" ? "DARK_THEME" : "LIGHT_THEME")
    }

    useEffect(() => {
        let isMounted = true; 
        const getUsers = async() => {
            try {
                // reset is setIsLoading to true
                setIsLoading(true)
                const res = await fetch(`https://jsonplaceholder.typicode.com/users`, {
                    method: "GET",
                    headers: {"content-type": "application/json"}
                })

                if(!res.ok && isMounted) {
                    setError({success: false, error: `HTTP Error status code ${res.status} and status ${res.statusText}`})
                    return;
                }

                const data = await res.json()
                if(isMounted)
                    setUsers(data)
            } catch(err) {
                if(isMounted){
                    // TypeError && err.message === "Failed to fetch" so Network Error
                    if(err instanceof TypeError && err.message === "Failed to fetch")
                        setError({success: false, error: `Network Error: Failed to fetch, check your network connections - ${err.message}`})
                    // SyntaxError so mean Data Error: the server sent back invalid info
                    else if(err instanceof SyntaxError)
                        setError({success: false, error: `Data Error: The server sent back invalid information ${err.message}`})
                    // other Unexpected Error
                    else 
                        setError({success: false, error: `Unexpected Error: ${err}`})
                }
            } finally {
                if(isMounted)
                    setIsLoading(false)
            }
        }
        // invoked getUsers
        getUsers()
        
        // cleanup function stop fetching from api (like timeout) before unmount component and before next render
        return () => {
            isMounted = false;
        }
    }, [])

    if(isLoading)
        return <div className="container">Loading Users ....</div>
    if(!error.success)
        return <div className="container">something went wrong!- {error.error}</div>
    return <div className="conatiner">
        <ul>
            {
                users.map(user => {
                    return( 
                        // <UserProfile userId={user.id}/>
                        <li key={user.id}>
                            <h2>{user.name} - {user.email} -{user.company.name} -{user.address.city} -{user.phone} -{user.website}</h2>
                        </li>
                    )
                })
            }
        </ul>
        <form action="" method="GET">
            <label htmlFor="users">Select User Name:</label>
            <select name="users" id="users" onChange={(e) => setUserId(Number(e.currentTarget.value))}>
                <option value="0" selected>-- Select User--</option>
                {
                    users.map(user => {
                        return (
                            <option value={user.id} key={user.id} 
                            
                            >{user.name}</option>
                        )
                    })
                }
            </select>
        </form>
        {
            userId &&
            <UserProfile 
            user={users.find(user => user.id === userId)}
            theme={theme}
            toggleTheme={toggleTheme}/>
        }
    </div>
}


const UserProfile = ({user, theme, toggleTheme}: {user: Iusers | undefined, theme: string, toggleTheme: () => void}) => {
    return <div className="container">
        <ul>
            <li>{user?.id}</li>
            <li>{user?.name} </li>
            <li>{user?.address.city}</li>
            <li>{user?.email}</li>
            <li>{user?.company.name}</li>
            <li>{user?.phone}</li>
            <li>{user?.website}</li>
        </ul>
        <p>{theme}</p>
        <button type="button" onClick={toggleTheme}>toggle Theme</button>
    </div>
}
```
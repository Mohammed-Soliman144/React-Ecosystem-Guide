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
            <select name="users" id="users" value={userId} onChange={(e) => setUserId(Number(e.currentTarget.value))}>
                <option value="0">-- Select User--</option>
                {
                    users.map(user => {
                        return (
                            <option key={user.id} value={user.id}>{user.name}</option>
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
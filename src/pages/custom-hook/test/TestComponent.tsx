import { useState, useEffect } from "react"
import { useToggle } from "../hooks/useToggle"
import { useInput } from "../hooks/useInput"
import { useDebouce } from "../hooks/useDebouce"
import { useThrottle } from "../hooks/useThrottle"
import { useClickOutside } from "../hooks/useClickOutside"
import { useAsync } from "../hooks/useAsync"
import { useFetch } from "../hooks/useFetch"
import * as z from "zod"
import { useLocalStorage } from "../hooks/useLocalStorage"

const commentsSchema = z.array(z.object({
    id: z.number(),
    name:z.string(),
    username:z.string(),
    email: z.string(),
    address: z.object({
        street: z.string(),
        suite: z.string(),
        city: z.string(),
        zipcode: z.string(),
        geo: z.object({
            lat: z.string(),
            lng: z.string()
        }).loose()
    }).loose(),
    phone: z.string(),
    website: z.string(),
    company: z.object({
      name: z.string(),
      catchPhrase: z.string(),
      bs: z.string(),
    }).loose()
}).loose())


const themeSchema = z.enum(["LIGHT", "DARK"])

// type themeType = z.infer<typeof themeSchema>

interface Users  {
    id: number,
    name: string,
    username:string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
            geo: {
                lat: string,
                lng: string
            }
    }
}

const fetchUsers = async (): Promise<Array<Users>> => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    })
    if(!res.ok)
        throw new Error(`HTTP error status code ${res.status} and status text ${res.statusText}`)
    return await res.json()
}
export const TestComponent = () => {
    
    const [openModal, handleOpenModal, setOpenModal, setCloseModal] = useToggle()
    const {handleChange: changeName, handleReset: resetName, ...name} = useInput()    
    const {handleChange: changeEmail, handleReset: resetEmail, ...email} = useInput()    
    const {handleChange: changePass, handleReset: resetPass, ...pass} = useInput()
    const [width, setWidth] = useState(typeof window !== "undefined"? window.innerWidth : 0)
    const handleThrottle = useThrottle(() => setWidth(window.innerWidth), 1000)
    useEffect(()=> {   
        window.addEventListener("resize", handleThrottle)
        return () => window.removeEventListener("resize", handleThrottle)
    }, [handleThrottle])
    const [search, setSearch] = useState("")
    const handleSearch = useDebouce((val) => {
        console.log(val)
    }, 1000)
    
    const [isOpen, setIsOpen] = useState(false)
    const dropDownRef = useClickOutside<HTMLElement>(()=>setIsOpen(false))

    const {data, error, isLoading, status, reset, execute} = useAsync(fetchUsers, false)
    
    const {data: commentsData, isLoading: isLoadingComments, error: errorComments, refetch, success, message} = useFetch("https://jsonplaceholder.typicode.com/users", {method: "GET", headers: {"content-type": "application/json"}}, commentsSchema)

    const [theme, setTheme] = useLocalStorage("TestTheme", "LIGHT", themeSchema)


    const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setTheme(prev => prev === "LIGHT"? "DARK" : "LIGHT")
    }

    // const signal = new AbortController()
    return <div className="container">
        {/* Test useToggle */}
        <section className="use-toggle">
            <h2 className="text-4xl text-slate-900">Modal is {openModal? "OPEN" : "CLOSE"}</h2>
            <button className="text-white bg-black p-3 rounded-xl" type="button" onClick={handleOpenModal}>Switch Modal</button>
            <button className="text-white bg-black p-3 rounded-xl" type="button" onClick={setOpenModal}>Open Modal</button>
            <button className="text-white bg-black p-3 rounded-xl" type="button" onClick={setCloseModal}>Close Modal</button>
        </section>
        <hr />
        {/* Test useInput */}
        <form action="" className="use-input">
            <div className="form-controls">
                <input type="text"  {...name.bind} />
            </div>
            <div className="form-controls">
                <input type="email"  {...email.bind}/>
            </div>
            <div className="form-controls">
                <input type="password"  {...pass.bind}/>
            </div>
            <div>
                <p>name: {name.bind.value}</p>
                <p>email: {email.bind.value}</p>
                <p>password: {pass.bind.value}</p>
            </div>
            <button className="text-white bg-black p-3 rounded-xl" type="button" 
            onClick={(e) => resetName(e)}>Reset name</button>
            <button className="text-white bg-black p-3 rounded-xl" type="button" onClick={(e) => resetEmail(e)}>Reset Email</button>
            <button className="text-white bg-black p-3 rounded-xl" type="button" onClick={(e) => resetPass(e)}>Reset Pass</button>

            <button className="text-white bg-black p-3 rounded-xl" type="button" onClick={(e) => changeName(e, "Muhammad Soliman")}>Change Name</button>
            <button className="text-white bg-black p-3 rounded-xl" type="button" onClick={(e) => changeEmail(e, "m.saied@gmail.com")}>Change email</button>
            <button className="text-white bg-black p-3 rounded-xl" type="button" onClick={(e) => changePass(e, crypto.randomUUID())}>Change pass</button>
        </form>
        <hr />
        {/* Test useDebouce Custom Hook */}
        <form action="" method="GET">
            <label htmlFor="name">
                <input type="text" id="name" value={search} 
                onChange={(e) => {
                    setSearch(e.target.value)
                    handleSearch(e.target.value)
                }}/>
            </label>
        </form>
        {/* Test useThrottle Custom Hook - handle Inifinite scroll, track window with */}
        <section className="width">
            <h2>{width}</h2>
        </section>
        {/* Test useClickOutside Custom Hook */}
        <nav ref={dropDownRef} aria-label="Main Navigation">
            <button onClick={() => setIsOpen(prev => !prev)} 
                aria-expanded={isOpen}
                aria-haspopup="true"
                className="bg-red-500">
                open Dropdow
            </button>
            <ul
            style={{
                visibility: isOpen? "visible" : "hidden",
            }} >
                <li>Home</li>
                <li>Products</li>
                <li>Services</li>
                <li>Downloads</li>
            </ul>
        </nav>
        {/* Test useAsync  */}
        <section className="users">
            <button type="button" onClick={execute}>Fetch users data</button>
            <button type="button" onClick={reset}>reset</button>
            {
                status === "SUCCESS" &&
                <ul>
                    {
                        data?.map(us => {
                            return (
                                <li key={us.id}>
                                    <h2>{us.name} - {us.username}</h2>
                                    <p>{us.address.city.concat(" - ", us.address.street)}</p>
                                    <p>{us.email}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            }
            {
                isLoading && status === "PENDING" &&
                <p>loading users profile....</p>
            }
            {
                status === "ERROR" &&
                <p>{error?.message}</p>
            }
        </section>
        {/* useFetch Custom Hook */}
        <section className="commments">
            <button type="button" onClick={refetch}>Fetch Data Comments</button>
            {
                !isLoadingComments && <p>Loading Comments...</p>
            }
            {
                !success && message?.includes("error") && errorComments &&
                <p>Something went wrong, please try again {errorComments.message}</p>
            }
            {
                commentsData?.map(com=> {
                    return (
                        <>
                            <p key={com.id}>{com.username}</p>
                            <p key={com.email}>{com.email}</p>
                        </>
                    )
                })
            }
        </section>
        {/* Test useLocalSTorage */}
        <section>
            <h2>{theme}</h2>
            <button type="button" onClick={toggleTheme}>Change Theme</button>
        </section>
    </div>
}

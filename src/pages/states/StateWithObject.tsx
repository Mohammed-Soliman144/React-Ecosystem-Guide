import {useState} from "react"

type userType = {
    name: string, 
    age: number, 
    isMale: boolean, 
    address: {
        city: string,
        country: string
    }
}
export const StateWithObject = () => {
    const [user, setUser] = useState<userType>({
        name: "Muhammad",
        age: 30,
        isMale: true,
        address: {
            city: "Cairo",
            country: "Egypt"
        }
    })

    const updateName = () => {
        setUser(prev => {
            return {
                ...prev,
                name: "Ahmed Ali"
            }
        })
    }
    const updateAge = () => {
        setUser(prev => {
            return {
                ...prev,
                age: prev.age + 1,
            }
        })
    }

    const updateCity = () => {
        setUser(prev => {
            return {
                ...prev,
                address: {
                    ...prev.address,
                    city: "Alexanderia",
                }
            }
        })
    }

    return (
        <div className="container">
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>Gender: {user.isMale ? "Male" : "Female"}</p>
            <p>City: {user.address.city}</p>
            <p>Country: {user.address.country}</p>
            <button type="button" onClick={updateName}>Update Name</button>
            <button type="button" onClick={updateAge}>Update Age</button>
            <button type="button" onClick={updateCity}>Update City</button>
        </div>
    )
}
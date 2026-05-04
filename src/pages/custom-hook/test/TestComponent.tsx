import { useState, useEffect } from "react"
import { useToggle } from "../hooks/useToggle"
import { useInput } from "../hooks/useInput"
import { useDebouce } from "../hooks/useDebouce"


export const TestComponent = () => {
    
    const [openModal, handleOpenModal, setOpenModal, setCloseModal] = useToggle()
    const {handleChange: changeName, handleReset: resetName, ...name} = useInput()    
    const {handleChange: changeEmail, handleReset: resetEmail, ...email} = useInput()    
    const {handleChange: changePass, handleReset: resetPass, ...pass} = useInput()
    const [search, setSearch] = useState("")
    const handleSearch = useDebouce((val) => {
        console.log(val)
    }, 1000)

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
    </div>
}

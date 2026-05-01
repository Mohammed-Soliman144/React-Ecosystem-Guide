import {useState} from "react"

export const StateWithArray = () => {
    const [list, setList] = useState([
        {id: 1, text: "JavaScript", status: false},
        {id: 2, text: "TypeScript", status: false},
        {id: 3, text: "React", status: false},
        {id: 4, text: "Next.js", status: false},
    ])

    const handleDelete = (id: number) => {
        setList(prev => prev.filter(item => item.id !== id))
    }


    const handleUndo = (id: number) => {
        setList(prev => prev.map(item => {
            if(item.id === id)
                return {
                    ...item,
                    status: !item.status
                }
            return item;
        }))
    }

    const handleAdd = () => {
        setList(prev => [
            ...prev,
            {
                id: prev.length? prev[prev.length - 1].id + 1 : 1,
                text: "CSS3",
                status: false
            }
        ])
    }


    const handleAdding = () => {
        setList(prev => prev.concat({id: prev.length? prev[prev.length - 1].id + 1 : 1, text: "HTML5", status: false}))
    }
    
    return (
        <div className="container">
            <ul>
                {
                    list.map(item => {
                    return <li style={{
                                textDecoration: item.status ? "line-through" : "none"
                            }}
                                key={item.id}>
                                <span>{item.text}</span>
                                <button type="button" onClick={() => handleDelete(item.id)}>Delete</button>
                                <button type="button" onClick={() => handleUndo(item.id)}>{item.status ? "Undo" : "Done"}</button>
                            </li>
                    })
                }
            </ul>
            <button type="button" onClick={handleAdd}>Add New Item</button>
            <button type="button" onClick={handleAdding}>Add New Item</button>
        </div>
    )
}
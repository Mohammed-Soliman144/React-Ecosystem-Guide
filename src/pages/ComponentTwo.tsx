
interface props {
    name: string, 
    price: number, 
    isUpdated: boolean,
    categories: Array<string>,
    made: {city: string, date: string}
}

const ParentComponent = () => {
    return <div className="container">
        <ChildComponent 
            name="Mac Air Pro+" 
            price={3000}  
            isUpdated={true}
            categories={["Apple", "Mac Laptop", "Programming"]}
            made={{
                city: "USA",
                date: "9-15-2025"
            }}
            />
    </div>
}



const ChildComponent = ({name, price, isUpdated, categories, made}: props) => {
    return <article>
        <h2>{name}</h2>
        <p>price = ${price}</p>
        <p>Has updating system ={isUpdated? "Yes" : "No"}</p>
        <p>Categories: {categories.join(", ")}</p>
        <p>City Made: {made.city}</p>
        <p>Date Made: {made.date}</p>
    </article>
}

export {ParentComponent}


const ComponentA = () => {
    return (
        <ComponentB id="email" type="email" placeholder="type your email" className="first-email"/>
    )
}
const ComponentB = ({...rest}) => {
    return <input {...rest} />
}

export {ComponentA}

// D- Example props and children in tsx
const ComponentAA = () => {
    return (
        <ComponentBB className="container">
            <label htmlFor="email">Email: </label>
            <input id="email" type="email" placeholder="type your email" className="first-email" value="ahmed@gmail.com"/>
        </ComponentBB>
    )
}
const ComponentBB = ({className, children}: {className: string, children: React.ReactNode}) => {
    return <div className={className}>
        {children}
    </div>
}

export {ComponentAA}
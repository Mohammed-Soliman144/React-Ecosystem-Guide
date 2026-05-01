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


const ChildComponent = ({name, price, isUpdated, categories, made}) => {
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
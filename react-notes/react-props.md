# React Props
1. **props:** props stands for properties and props are agruments passing from parent to childs and can be any datatype in js like number, string, boolean, object, array. (all js datatypes wrapped in {} curely braces but string direct between double quotes "string") [destructuring props OR rest props (spread operator syntax) OR default Props OR pass functions as Props (callback functions)].
2. **children:** children represent for nested wraping JSX Elements.
3. **Default Props:** if passing null or 0 or false not work (not get default value) but if missing to passing value or passing undefined return defaul value.
```js
// A- jsx files its fine
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

// B- for tsx as below must use type or interface to define types of props
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

// C- Example rest props and other props in tsx
const ComponentA = () => {
    return (
        <ComponentB id="email" type="email" placeholder="type your email" className="first-email"/>
    )
}
const ComponentB = ({...rest}) => {
    return <input id={id} {...rest} />
}

export {ComponentA}


// D- Example props and children in tsx
const ComponentA = () => {
    return (
        <ComponentB className="container">
            <label htmlFor="email">Email: </label>
            <input id="email" type="email" placeholder="type your email" className="first-email" value="ahmed@gmail.com"/>
        </ComponentB>
    )
}
const ComponentB = ({className, children}: {className: string, children: React.ReactNode}) => {
    return <div className={className}>
        {children}
    </div>
}

export {ComponentA}

// E- Example Default props and children in tsx
const ParentComponent = ( ) => {
    return <ChildComponent name="Muhammed" job="Senior" />
}
// default arguments is already optional so must use argument?: datatype
// null || false || 0 => so default not print inside jsx element
// undefined || missingPass => will print out default value in jsx element
const ChildComponent = ({name = "Guest", job = "Developer"} : {name?: string, job?: string}) => {
    return <h1>Hello {name} - {job}</h1>     
}

export {ComponentA}

```





# Export Statement Rules:
1. you can only use one export default per file.
2. export default for ComponentOne as name can import SpecialComponent (fine).
3. export default enables you to rename function when import as you want which causing naming confusion or confliction.
4. Can not use export default with arrow function in the same line of code will get error.
```js
    // ERROR (Wrong) => can not use keyword const after default 
    export default const ComponentOne = () => {
        return <h1>Component One</h1>
    }
```
```js
// A- Export Default Regular Function => components/ComponentOne.tsx
export default function ComponentOne() {
    return <div className="container">
        <h1>Component One</h1>
    </div> 
}

// Import Regular Function => src/App.tsx
import SpecialFunction from "./components/ComponentOne"

function App() {
    return (
        <>
            <SpecialFunction />
        </>
    )
}

export default App

// B- Export Default Arrow Functions => components/ComponentOne.tsx
const ComponentOne = () => {
    return <div className="container">
        <h1>Component One</h1>
    </div> 
}

export default ComponentOne

// Import Arrow Functions => src/App.tsx
import SpecialFunction from "./components/ComponentOne"

function App() {
    return (
        <>
            <SpecialFunction />
        </>
    )
}

export default App

```


1. export naming statement prevents naming confliction which when import function must use the same name of export.
2. can use multiple export inside one file (fine).

```js
// A- Arrow Functions
export const Component = () => {
    return <div className="container">
        <h1>Component One</h1>
    </div> 
}

// OR
const Component = () => {
    return <div className="container">
        <h1>Component One</h1>
    </div> 
}

export {Component};

// Regular Functions
export function Component() {
    return <div className="container">
        <h1>Component One</h1>
    </div> 
}

// OR 
function Component() {
    return <div className="container">
        <h1>Component One</h1>
    </div> 
}

export {Component}
``` 
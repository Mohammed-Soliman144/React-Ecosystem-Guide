/* 
    1. Arrow function Component vs regular function component 
    2. Export statement rules
*/

/* Regular Function Component */
function ComponentOne() {
    return <div className="container">
        <h1>Component One</h1>
    </div>
}

/* Arrow Function Component */
const ComponentTwo = () => {
    return <div className="container">
        <h2>Component Two</h2>
    </div>
}


/* export default */
export default function ComponentThree() {
    return <div className="container">
        <h2>Component Three</h2>
    </div>
}

/* export Naming */
export const ComponentFour = () => {
    return <div className="container">
        <h2>Component Four</h2>
    </div>
}

/* export Naming */
const ComponentFive = () => {
    return <div className="container">
        <h2>Component Five</h2>
    </div>
}

export {ComponentOne, ComponentTwo, ComponentFive}
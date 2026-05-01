# What is States in React?
1. State is a component memory that holds data between rerenders.
2. State can keep last value of data between rerender (presistence).
3. State can trigger React to rerender when the value of data changed.
4. State Can trigger React to rerender when the value of state changed but react smart enough which is compare last value with new value if are equals react not rerender and if are different react rerender.
5. States divided into two categories local states and global states.
6. local state is the local date related to one Component.
7. global state is the global (shared) data that sharing between multiple components.

## Difference Between States and Props?
- **Props:**
  1. Props are arguments passing to component from its parent (from outside component).
  2. Props are read only can not component change it must change inside parent component.
  3. Props for child component === arguments (read only arguments can not changed) but Props for Component itself (parent) === are local states can changed it.
  4. note Parent component can passing three things static values, local states and global states passing down as props (but its own for grand parent not component itself).
- **States:**
  1. States are special variables that holds data between renders.
  2. States if changed its that trigger react to rerender.

## Variables VS States:
- **Variables:**
  1. Variable can hold data but in each render these variables are created from scratch which destoryed the last values in variable between rerenders.
  2. Regular variables can not trigger React to rerender when the value in its changed. (because component is just js function when recall again all local variables inside function reinitialized and all values after call function deleted automatically by using garbage collection)
```js
// By using Regular Variables
export const Counter = () => {
    console.log("The Counter Component Render")
    let counter = 0;
    const handleClick = () => {
        counter = counter + 1;
        console.log(count);
    }
    return <button type="button" onClick={handleClick}>{counter}</button>
}
// Issue That generating from regular variables:
/* 
    1- in each time Counter Component render count variable will reinitialize zero (always zero).
    2- in each time count variable changed react does not know what is change which means react always not rerender when value changed.
*/
```
- **States:**
  1. States are special Variables can hold data and also can keep last value of data between rerenders and also can trigger react the data inside variable change must be rerender the component with new value.  

```js
// By using states - useState with number
import {useState} from "react"

export const Counter = () => {
    const [count, setCount] = useState(0);
    return <button type="button" onClick={() => setCount(prev => prev + 1)}>Count: {count}</button>
} 
```



## When you need States in React?
1. Does the data (state) need to change overtime?
2. Does the UI need to update when this data changed?
3. Does the component need to remember this data (states) between rerenders?
4. if any question of this is yes so you need to create states (local / global if shared).
5. The Thumb Rule => Data is state of the component that owns the power change its and becomes a prop when need shared data to child to only read its.


## What React Deals with states?
1. React provides special Functions its Called hooks to deals with states.
2. to handle local states use hook called useState for simple states (primitive datatype number, string or boolean - simple states ).
3. to handle local states use hook called useReducer for complex states (secondary datattype array - object).
4. to handle global states use hook called useContext. (or zuztand or redux)


## What are Rules of Hooks and Custom Hooks in React?
1. all Hooks must be define at the top level which means:
   1. Can not define inside if statements.
   2. Can not define inside loops.
   3. Can not define inside nested functions.
   4. Can not define inside try/catch block.
2. all Hooks can recall it from:
   1. Function Components.
   2. Custom Hook (special function can create to do specific task as you want) 
```js 
// why Can not use hooks inside conditions,loops, nested functions or try/catch block behind the scences:
// React memory for each component depends on Ordered Linked List (is as array index starts from 0)
// So in Each time you create Hook React Saved it based on index so first hook === array[0] and so on.
// between rerendering cycle if the hook depends on condition if condition is false hook not execute so suppose these hook is second one === array[1], so in the case react will be confused which react will update the third hook === array[2] in the second one which make all data (states) are corrputed. 
// all things inside react deals with it as Linked list so that interpret the same behavior which must use unique identifier key when add rendering list in react with unique attribute called key and so on. 
// Note Hook itself is as object from datastructure but React Memory for component is as Ordered Linked List (array)
```


## What is State Update Cycle in React?
1. Trigger Phase => when use setter function of state, its trigger react to marks the component has something changed need to rerender.
```js
const handleClick = () => {
    setCount(prev => prev + 1) // setter fucntion that trigger react to marks your component
}
```
2. Batching Phase => in this phase react gathering all setter function inside component and get the result of updates in order queue (until this phase there is no any change in UI).
```js
import {useState} from "react"
const [count, setCount] = useState(0)
const [name, setName] = useState("")
const handleClick = () => {
    setCount(prev => prev + 1) // Result count = 1
    setCount(prev => prev + 10) // Result count = 11
    setCount(prev => prev + 5) // Result count = 16
    setName("Muhammad") // Result name = Muhammad
    /* Batching Phase (Updater functions Queue)
        0 => count = 1 
        1 => count = 11 
        2 => count = 16 
        3 => name = muhammad 
    */
}
```
3. Snapshot Phase => in this phase react take last result from updater function (Batching phase) and make all results are fixed values (constants) which means snapshot is as take photo by camera at the specific mile of second
```js
// Snapshot Phase behavior interprets why count when print out it still zero
import {useState} from "react"
const [count, setCount] = useState(0)
const handleClick = () => {
    setCount(prev => prev + 1) 
    console.log(count) // still count print out zero
}
```
4. Rendering Phase => in this phase react rendering all component that marks as updated or changed in new virtual DOM then compare old virtual dom with new one to update only parts of ui that already changed.
5. Commit Phase => in this phase react commit or push new virtual dom with all component that changed or updated to actual DOM. (after this phase change UI updated on browser to user).


## What is React life Cycle?
- React passing three phasing in life cycle as below:
  1. Mounting Phase (ComponentDidMount) => React Mount all Components to Actual DOM in browser for first mount the entire react app. 
  2. Updating Phase (ComponentDidUpdate) => React in this phase handle all State Update Cycle inside this phase which updating phase is that phase react do diffing algorithms to push new virtual dom to actual Dom which contains five phases:
     1. Trigger Phase.
     2. Batching Phase.
     3. Snapshot Phase.
     4. Rendering Phase.
     5. Commit Phase. 
  3. Unmounting Phase (ComponentWillUnmounting) => React in this phase to optimize performance when user after clik Home page then go away to another page in your app so all component inside Home Page unmounting or destorying which means all states are deleted from React Memory when come back to Home page all Component go to step 1 Moounting which reinitialize all state with initial values.
- React side Effects Cycle:
    1. Mounting Phase: after first mounting phase react runs side effects with empty dependencies array.
        ```js
            import {useState, useEffect} from "react"
            export const Counter = () => {
                const [count, setCount] = useState(0)
                useEffect(()=> {
                    console.log(count)
                    // side effects related to:
                    /* 
                        1- DOM Manipulation.
                        2- Fetching Data From API.
                        3- any syncrohous operations set its here.
                     */

                    // cleanup function
                    return () => {
                        // like remove functions that attached to addEventListener
                    }
                },[]) // this runs after first mounting phase [] empty dependencies array
                return <button type="button" onClick={() => setCount(prev => prev + 1)}>
                    {count}
                </button>
            }
        ```
    2. Updating Phase: after updating phase finished react runs side effect that related by states that are changed with array of states [count].
        ```js
            import {useState, useEffect} from "react"
            export const Counter = () => {
                const [count, setCount] = useState(0)
                useEffect(()=> {
                    console.log(count)
                    // side effects related to:
                    /* 
                        1- DOM Manipulation.
                        2- Fetching Data From API.
                        3- any syncrohous operations set its here.
                     */

                    // cleanup function
                    return () => {
                        // like remove functions that attached to addEventListener
                    }
                },[count]) // this runs after updating phase [count] with dependencies array
                return <button type="button" onClick={() => setCount(prev => prev + 1)}>
                    {count}
                </button>
            }
        ```
    3. Unmounting Phase: before run the unmounting phase react run cleanup functions inside useEffect() function and before destorying it which means runs before second mounting phase. or in other explicit words cleanup function inside useEffect will runs before unmounting (destorying the component) and also before runs the next side effect (next useEffect()) during Updating phase [also must now useEffect function (side effects) is syncrohous operation itself but one of purposes manage asyncrohous operations like fetching data from api].
        ```js
            import {useState, useEffect} from "react"
            export const Counter = () => {
                const [count, setCount] = useState(0)
                useEffect(()=> {
                    console.log(count)
                    // side effects related to:
                    /* 
                        1- DOM Manipulation.
                        2- Fetching Data From API.
                        3- any syncrohous operations set its here.
                     */

                    // cleanup function => runs before unmpunting phase
                    return () => {
                        // like remove functions that attached to addEventListener
                    }
                },[count]) // this runs after updating phase [count] with dependencies array
                return <button type="button" onClick={() => setCount(prev => prev + 1)}>
                    {count}
                </button>
            }
        ```

## What is Browser Page Life Cycle (or Critical Rendering Path CRP)?
1. DOM Phase => Browser Create Actual DOM the tree nodes of all HTML File or elements.
2. CSSOM Phase => Browser Create tree Nodes of all CSS file or css selectors.
3. Rendering Tree => Browser merge DOM and CSS styles of each css selector in one tree node called CSSOM.
4. Layout or Reflow Phase => Browser Calculate (width, height, position etc.. ) for each element in your html file according to your device size. (different user use laptop and other use desktop, etc...)
5. Painting Phase => Browser Convert Layout or Reflow Phase in pixel units in your browser which draw your element (html, css) in pixels units note painting its actually drawing each component in different layout which mean painting in many layers not one.
6. Composition Phase (compositing Phase) => This phase gathering all layers of painting in one big image or in one layer.


## React Life Cycle Linked with Browser Page Cycle?
1. Mounting Phase.
2. Updating Phase. (State Update Life Cycle)
   1. Trigger Phase.
   2. Batching Phase.
   3. Snapshot Phase.
   4. Rendering Phase.
   5. Commit Phase.
3. useLayoutEffect() => hook in react used for measurement actual DOM 
4. Layout or Reflow Phase. (Browser)
5. Painting Phase. (Browser)
6. Composition Phase. (Browser)
7. useEffect() => side Effects


## How Update Complex States for arrays or objects:
1. Object States:
   1. when deals with state for object must usig spread operator when modify or update, add and delete.
   2. note using spread operator to unpacking elements from outer object then using another spread operator for inner or nested object.
   3. when delete keys of object by destructuring here in the case must use optional chaining operator ?. when access to this property in jsx which if try to access property your deleted by destructuring without using optional chaining operator your app will crash which you need to access undefined property. 
   4. the safety and standard way to delete key of object by using null keyword.
   5. note need to use nested or inner spread operator for nested objects when need to adding, modifying or updating as below example.
```js
const [user, setUser] = useState({
        name: {
            first: "muhammad",
            last: "soliman",
        },
        email: "m.saied@gmail.com",
        gender: true,
        age: 33,
        address: {
            city: "Cairo",
            country: {
                citizen: "Egypt",
                visa: "UAE",
                visitor: ["USA", "Kuwait", "Qatar"],
            }
        }
    })
const handleUser = () => {
    setUser(prev => {
        return {
            // now whole object and nested object are return as the same
            ...prev,
        }
    })
}
// but when modify, adding need to nested spread operator
const handleUpdating = () => {
    setUser(prev => {
        return {
            ...prev,
            name: {
                ...prev.name,
                last: "Ahmed"
            }
        }
    })
}
```
```js
import {useState} from "react"

export const ComponentOne = () => {
    const [user, setUser] = useState({
        name: {
            first: "muhammad",
            last: "soliman",
        },
        email: "m.saied@gmail.com",
        gender: true,
        age: 33,
        address: {
            city: "Cairo",
            country: {
                citizen: "Egypt",
                visa: "UAE",
                visitor: ["USA", "Kuwait", "Qatar"],
            }
        }
    })
    const handleUpdate = () => {
        setUser(prev => {
            return {
                ...prev,
                name: {
                    ...prev.name,
                    last: "Saied"
                },
                email: "muhammad@gmail.com",
                gender: !prev.gender,
                address: {
                    ...prev.address,
                    city: "Alexanderia",
                    country: {
                        ...prev.address.country,
                        visa: "Saudia Arabia",
                        visitor: [...prev.address.country.visitor, "Morcco"]
                    },
                }
            }
        })
    }

    const handleAdd = () => {
        setUser(prev => {
            return {
                ...prev,
                name: {
                    ...prev.name,
                },
                postalCode: {
                    city1: 20545,
                    city2: 12445,
                },
            }
        })
    }

    const handleDelete = () => {
        // when delete keys of object by destructuring here
        // in the case must use optional chaining operator ?. when access to this property in jsx
        // if try to access property your deleted by destructuring without using optional chaining operator your app will crash which you need to access undefined property
        setUser(({address, ...prev}) => {
            return prev;
        })

        // so Best practice of deletion for object by using null keyword its safety
        setUser(prev => {
            return {
                ...prev,
                address: null,
            }
        })
    }
    return <div className="container">
        <h2>{user.name.first.concat(" ", user.name.last)}</h2>
    </div>
}
```  
```js
// Complete Example with object
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
```
1. Array States:
   1. using array.filter method when deleting elements from array.
   2. using array.map method when modifying elements of array.
   3. using spread operator or array.concat when adding new elements to array.
   4. using spread operator for unpacking outer array and using another spread operator for unpacking inner or nested array.
```js
    import {useState} from "react"
    export const ComponentOne = () => {
        const [products, setProducts] = useState([
            {id: 1, product: "Mac Book Pro+1", price: 2000},
            {id: 2, product: "Mac Book Pro+2", price: 3000},
            {id: 3, product: "Mac Book Pro+3", price: 4000},
            {id: 4, product: "Mac Book Pro+4", price: 5000},
            {id: 5, product: "Mac Book Pro+5", price: 6000},
        ])
    }

    const handleDelete = (id: number) => {
        setProducts(prev => prev.filter(item => item.id !== id))
    }

    const handleUpdate = (id: number) => {
        setProducts(prev => prev.map(item => item.id === id ? {...item, price: 15000} : item))
    }

    const handleAdding = () => {
        setProducts(prev => {
            return [
                ...prev,
                {id: prev.length ? prev[prev.length - 1].id + 1 : 1, product: "Air Pods pro+", price: 299},
            ]
        })
    }

    return <div className="container">
        <ul>   
            {
                products.map(item => {
                    return (
                        <li key={item.id}>
                            <span>{item.product}</span>
                            <span>{item.price}</span>
                        </li>
                    )
                })
            }
        </ul>
    </div>
```  
```js
// Complete Example of Array
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
```


## What is Lifting State Up?
1. when you need to share state between two or more components follow below steps:
   1. Must lift state up (move state up) to nearest common parent for components.
   2. Must Create definition and declaration of handler function (setter function) in the parent component.
   3. Must passing handler Function (setter function) as reference name and as props for child components.
   4. inside Child Component passing any arguments to handler function if required then invoked or calling it.
```js
import {useState} from "react"

type productsType = Array<{id: number, name: string, price: number, qty: number}>
export const ParentComponent = () => {
    const [products, setProducts] = useState<productsType>([
        {id: 1, name: "Mac Book Air Pro+1", price: 2000, qty: 0},
        {id: 2, name: "Mac Book Air Pro+2", price: 3000, qty: 0},
        {id: 3, name: "Mac Book Air Pro+3", price: 4000, qty: 0},
    ])
    const handleDelete = (id: number) => {
        setProducts(prev => prev.filter(item => item.id !== id))
    } 

    const handleIncrement = (id: number) => {
        setProducts(prev => prev.map(item => item.id === id? {...item, qty: item.qty + 1} : item))
    }
    return <div className="container">
        <ChildComponentOne products={products} handleDelete={handleDelete} handleIncrement={handleIncrement}/>
        <ChildComponentTwo products={products} handleDelete={handleDelete} handleIncrement={handleIncrement}/>
    </div>
}

const ChildComponentOne = ({products, handleDelete, handleIncrement}: {products: productsType, handleDelete: (id: number) => void, handleIncrement: (id: number) => void}) => {
    return <ul className="products">
        {
            products.map(item => {
                return (
                    <li key={item.id}>
                        <h3>{item.name}</h3>
                        <h3>{item.price}</h3>
                        <button type="button" onClick={() => handleDelete(item.id)}>Delete From Cart</button>
                        <button type="button" onClick={() => handleIncrement(item.id)}>Add To Cart</button>
                    </li>
                )
            })
        }
    </ul>
}

const ChildComponentTwo = ({products, handleDelete, handleIncrement}: {products: productsType, handleDelete: (id: number) => void, handleIncrement: (id: number) => void}) => {
    return <ul className="products">
        {
            products.map(item => {
                return (
                    <li key={item.id}>
                        <h3>{item.name}</h3>
                        <h3>{item.price}</h3>
                        <button type="button" onClick={() => handleDelete(item.id)}>Delete From Cart</button>
                        <button type="button" onClick={() => handleIncrement(item.id)}>Add To Cart</button>
                    </li>
                )
            })
        }
    </ul>
}
```

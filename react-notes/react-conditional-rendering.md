# What is Conditional Rendering in React:
- Conditional Rendering is a technique to visible or invisible function component from ui based on conditions.
  
## Ways To Achieve Conditional Rendering:
1. if else statements.
2. ternary operator.
3. && AND Operator.
4. Derived Variables with let keyword.
5. Activity Component React v19.2.

- **Activity Component:**
  1. Activity Component Can wrap nested children inside it (accept children, props, states and derived values)
  2. Activity Component is replacing && AND Operator issues.
  3. Activity Component has mode attribute (manadatory) accepts only two values "visible" or "hidden".
    ```js
        fucntion Component({isActive}: {isActive: boolean}) {
            return <Activity mode={isActive? "visible": "hidden"}>
                <ChildComponentOne />
                <ChildComponentTwo />
            </Activity>
        }
    ```
    4. Activity Component Stopping functionality of useEffect Hook (stopping side effects for wrapping components).
    5. Activity Component preserving or keeping last value of states when switching between two different modes visible and hidden.
    6. Activity Component preserving from unmount DOM Element for wrapping components inside its.
- **Literal Template Strings `${js expression}`** only use liter template strings when use backticks `color-${isActive? "yellow": "red"}` and always when you need to make string concatenation (combine static and dynamic strings)
```js
// 1- if else statement - Conditional Rendering
const ComponentOne = ({isAvailable}: {isAvailable: boolean}) => {
    if(isAvailable === undefined)
        return null;
    else if (isAvailable)
        return <div className="container">
            <h2>CTO is Available</h2>
        </div>
    else 
        return <div className="container">
            <h2>CTO is not Available, please check later again</h2>
        </div>
}

// 2- Ternary Operator ?
const ComponentOne = ({isAvailable}: {isAvailable: boolean}) => {
    return <div className="container" style={{backgroundColor: isAvailable? "#0F0" : "#F00" }}>
        <h2>CTO {isAvailable ? "Available" : "Not Available" }</h2>
    </div>
}

// 3- && AND Operator 
const ComponentOne = ({isAvailable}: {isAvailable: boolean}) => {
    return <div className="container">
        {
            isAvailable && <h2>CTO is Available</h2>
        }
        {
            !isAvailable && <h2>CTO is Not Available</h2>
        }
    </div>
}

// 4- Derived Variables with let keyword
const ComponentOne = ({age}: {age: number}) => {
    let output = null;
    if(age > 50)
        output = <div className="container">
            <h2>You are older man</h2>
        </div>
    else if(age <= 20)
        output = <div className="container">
            <h2>You are smaller man</h2>
        </div>
    return output
}

// 5- Activity Component New Feature in React 19.2 with mode attribute with two values visible or hidden
import {Activity} from "react"
const ComponentOne = ({isAvailable}: {isAvailable: boolean}) => {
    return <Activity mode={isAvailable? "visible" : "hidden"}>
        <p>Activity Component with mode attribute (mandatory) which accepts two values visible or hidden (as string values)<p>
        <p>Activity Component stopping execute side effects of react which means break out useEffect() functionality with cleanup function</p>
        <p>Activity Component Keep last value of states when replacing between two status of mode visible or hidden</p>
        <p>Activity Component prevents DOM Elements inside Component from unmounting</p>
        <p>Activity Can accept children component also states, props and derived values</p>
    </Activity>
}
```
# What is rules of react for rerendering?
1. In each small change in state (or props is as state but passing to childs) then react create virtual dom and compare it with actual dom in there any change react rerendering.
2. when parent component rerendering all child components it rerendering or recreating from scratch if is a function or props.
3. that behavior harmful for performance react apps.

## What is React.memo, useCallback, useMemo?
1. React.memo => is higher order component (HOC) its used for memorizing function component itself its props or states that passing from its parent component change React.memo it rerendering child component.
2. useCallback => is a hook use to memorize or cache function itself as address memory location. (not return value from it).
3. useMemo => is a hook use to memorize or cache return value from function if the value change the function will recreating from scratch (always for large computation like filter array of 1000 items and heavy logic).
4. useMemo is accepts return value from function not function and dependencies array
5. dependencies array for useMemo and useCallback syntax and React.memo syntax
```js
    /* React.memo - Higher order Component - 
        - wraps child components
        - only rerending child component of props or states passing from parent is changed.
        - does not accepts dependencies array

        */
    // syntax 1
    const ChildComponentA = React.memo(() => {
        // logic and contents of child component here
    })
    // syntax 2
    const ChildComponentB = () => {
    }
    // can not wrapped it inside curely braces {}
    export default React.memo(ChildComponentB)

    /* useCallback - hook
        - memorize and cache function itself as address memory location.
        - only rerendering if address memory location of function is changed.
        - used when passing function from parent component to child and need when any change happens in childs or parent component does not effect on this function
        - accepts dependencies array - and there 3 cases
            A- without dependencies array => runs the function in each change happens in parent component or childs of its.
            B- with empty dependency array => runs the function only once at mounting phase then cache address memory location of function (reference equity) if changes rerendering the function (recreating from scratch)
            C- with dependencies array with values => recreating the function from scratch if these values changed
    */  
   const rememberFunction = useCallback(() => {

   }, [val1, state1])
    
    /* useMemo - hook
        - memorize and cache values that returned from function itself and used when this function used to do heavy calculation or heavy computation that take more time to execute in each render so memorize or cache returned value of function.
        - only rerendering if the value that returned from function is changed.
        - can used inside child component itself or can use inside parent component then passing memorized value to other child component
        - accepts dependencies array - and there 3 cases
            A- without dependencies array => runs the function in each change happens in parent component or childs of its.
            B- with empty dependency array => runs the function only once at mounting phase then cache address memory location of function (reference equity) if changes rerendering the function (recreating from scratch)
            C- with dependencies array with values => recreating the function from scratch if these values changed
    */
    // syntax 1 - in both accepts value of fucntion as arrow function or callback function
    const rememberValue = useMemo(() => funcName(arg1), [val1, state1])
    // syntax 2 - in both accepts value of fucntion as arrow function or callback function
    const rememberValue = useMemo(() => array.find(item => item.id === 10), [val1, state1])

```
```js
import React, {useState, useCallback} from "react"

export const ParentComponent = () => {
    const [state, setState] = useState(0)
    const users = [/* 1000 items */]
    // in most cases use useCallback with React.memo
    const handleStateWithPrev = useCallback(() => {
       // note here no any dependencies array which setState based on closure which previous state 
       setState(prev => prev + 1)
    }, []) 

    // note here need to dependencies array
    const handleStateWithoutPrev = useCallback(() => {
        setState(state + 1)
    }, [state])

    const selectUser = (userId: number) => {
        return users.find(user => user.id === userId)
    }

    const userInfo = useMemo(() => selectUser(10), [users, userId])

    return <div className="container">
        <ChildComponent name="Ahmed" state={state} handleState={handleState} />
    </div>
}

const ChildComponent = React.memo(({name, state, handleStateWithPrev}: {name: string, state: number, handleStateWithPrev: () => void}) => {
    return <div className="container">
        <h2>{name}</h2>
        <p>{state}</p>
        <button type="button" onClick={handleStateWithPrev}>Change State</button>
    </div>
})
```





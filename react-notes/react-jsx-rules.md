# What is JSX in React: 
- **JSX:** is an extension extend from JavaScript and looks like HTML Element (language).

## Rules of JSX:
1. each function in javascript can not return two or more js object must be wrapped inside array so jsx must has one single root element.
```js
// ERROR (Wrong) => JSX Must has one single root element
export const ComponentOne = () => {
    return (
        <h1>Hello World</h1>
        <p>Js is best programming language</p>
    )
}

// Solution-1 JSX => wrap nested jsx element in single one root element
export const ComponentOne = () => {
    return (
        <div className="container">
            <h1>Hello World</h1>
            <p>Js is best programming language</p>
        </div>
    )
}

// Solution-2 JSX => empty fragment <></>
export const ComponentOne = () => {
    return (
        <>
            <h1>Hello World</h1>
            <p>Js is best programming language</p>
        </>
    )
}

// Solution-3 JSX =>  Fragment Element <Fragment></Fragment>
import {Fragment} from 'react'
export const ComponentOne = () => {
    return (
        <Fragment>
            <h1>Hello World</h1>
            <p>Js is best programming language</p>
        </Fragment>
    )
}

// empty fragement <></> and Fragment <Fragment></Fragment> is not html element is JSX Element for React but not element for html
```

2. JSX attributes must be written in camelCase as regular javascript variables to prevent conflicting with reserved keywards in javascript (not aria attributes use snake-case aria-label).

```js
// class in html === className (conflict with class keyword in js)
export const ComponentOne = () => {
    return (
        <div className="container">
            <h1>Hello World</h1>
            <p>Js is best programming language</p>
        </div>
    )
}
// for in html === htmlFor (conflict with for keyword in js)
export const ComponentOne = () => {
    return (
        <div className="container">
            <label htmlFor="email">Email: </label>
            <input type="email" id="email" />
        </div>
    )
}
```

3. JSX element must has closing tag even the element itself is self closing tage.

```js
// input is self closing tag can not use <input> must <input />
export const ComponentOne = () => {
    return (
        <div className="container">
            <label htmlFor="email">Email: </label>
            <input type="email" id="email" />
        </div>
    )
}
// img is self closing tag can not use <img> must <img />
export const ComponentOne = () => {
    return (
        <div className="container">
            <img src="hero.jpg" />
        </div>
    )
}
```

4. any JavaScript Expression must wrap inside curly braces {} when inserted inside JSX Element

```js
export const ComponentOne = () => {
    const name = "Muhammad Soliman";
    const isAvailable = true;
    return (
        <div className="container">
            <h1>Hello {name}</h1>
            <p>{isAvailable ? "Ready To Work" : "Busy"}</p>
        </div>
    )
}
```


### Component With JSX and Without JSX
1. React is interpretting JSX elements to html element that browser knows its by using React.createElement() function behind the scences 
```js
// Function Component with JSX - (easy to read)
export const ComponentOne = () => {
    return (
        <div className="container">
            <h1>Hello Muhammed</h1>
            <p>He is available to work</p>
        </div>
    )
}

// The same Function Component without JSX - (hard to read)
import {createElement} from "react"
export const ComponentOne = () => {
    return (
        createElement("div", {className: "container"}, 
        createElement("h1", null, 
        "Hello Muhammed", createElement("p", {id: "status", className: "status-parag"}, "He is available to work")))
    )
}

// createElement(htmlElement: string, attributesOrProps: object | null, children: string | null | createElement())
```
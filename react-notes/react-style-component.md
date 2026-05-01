# Ways of Styling Component in React:
1. Inline Style by using style attribute.
   - deals with style attribute as javascript not css.
   - so style accepts javascript object not strings as css.
   - so property-name in css (kebab0-case) === propertyName in js (camelCase)
   - so style attribute syntax => style={{backgroundColor: "#ff4444"}}
   - first {} curely braces to tell JSX will write javascript
   - second {} curely braces is javascript object the style attribute accepts.  
```js
// Inline Style By using style attribute
import React from "react"
export const ComponentOne = ({children, isActive}:{children: React.ReactNode, isActive: boolean}) => {
    return <div className='container' style={{
        backgroundColor: "#10b981", 
        visiability: isActive ? "visible" : "hidden",   
    }}>
        {children}
    </div>
}
```
2. Global Styles.
   - By using className attribute and global css files
   - this way causing global css styles conflict which all styles inside file.css from class selector or any css selector can access to it from any component inside your project (conflict).
  
```css
// src/Component.css
.alert {
    background-color: #10b981;
    padding: 16px;
}
.success {
    color: #fff;
}
.error {
    color: #000;
}
```

```js
// Global Styles by using className attribute and global css files
import React from "react"
import "./Component.css"
export const ComponentOne = ({children, type = "success"}:{children: React.ReactNode, type?: "success" | "error"}) => {
    return <div className={`container alert ${type}`}>
        {children}
    </div>
}
```
3. Module Styles.
    - Module Styles by using className attribute and module css files.
    - this way its resolving any conflict about your css styles because all styles inside file.module.css are processed and moduled by vite or next.js then create css styles with unique identifier key can not access from any component outside the component recall module css file inside it.
     - import styles from "ComponentName.module.css"
     - deals with styles (as javascript object) to access any key used styles.selector or styles[selector] or styles['selector-name']
     - syntax => 
     ```js
           return <div className={`container ${styles.selector} ${styles[selector]} ${styles['selector-name']}`}>
      ```
     - in this case must use literal template strings which is combining static class names with dynamic one



```css
// src/Component.module.css
.alert {
    background-color: #10b981;
    padding: 16px;
}
.success {
    color: #fff;
}
.error {
    color: #000;
}
```

```js
// Global Styles by using className attribute and module css files
import React from "react"
import styles from "./Component.module.css"
export const ComponentOne = ({children, type = "success"}:{children: React.ReactNode, type?: "success" | "error"}) => {
    return <div className={`container ${styles.alert} ${styles[type]}`}>
        {children}
    </div>
}
```
4. CSS-in-JS. (styled-components - 3rd library).
    - is a third library to enable you write css inside js.
    - npm install styled-components
    - import styled from "styled-components" 
```js
import styled from "styled-components"
import React from "react"

// Must outside of function Component To enhance performance and avoiding mounting and remounting in each render and also recreate states from scratch
const HeaderTitle = styled.h1`
        background-color: #ff4444;
        color: #fff;
        padding: 16px;
        margin-bottom: 8px;
    `
// Must outside of function Component To enhance performance and avoiding mounting and remounting in each render and also recreate states from scratch
const ButtonSecondary = styled.button`
    outline: none;
    border: 2px solid #efefef;
    font-familty: "Inter";
`
export const ComponentOne = () => {
    return <div className="container">
        <HeaderTitle>Hello World</HeaderTitle>
        <ButtonSecondary>Click Me!</ButtonSecondary>
    </div>
}

```



# What is Handling Events in React
- Handling Events in React doing in two steps:
    1. Any JSX Element accepts Events in js as attributes starts by onEvent.
    2. The event it self accept event handler function as value.
    3. each event handler function accepts by default event object that contains many information about the event (e.clientX | e.clientY | e.preventDefault() | e.target.value | e.currentTarget.value)
    4. there are many types of events React.MouseEvent | React.FocusEvent | React.InputEvent | React.TouchEvent | React.DragEvent | React.WheelEvent | React.ChangeEvent
```js
// Example of Event Handler function and events in react
// MouseEvent => onClick
export const ComponentOne = () => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log(`you are clicked on the button ${e.target}`)
    }
    return <button type="button" onClick={handleClick}>Click Me!</button>
}
// ChangeEvent => onChange
export const ComponentOne = () => {
    return <input type="text" 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {console.log(`your input is ${e.target.value}`)}}/>
}
```


## Event Handler Functions and passing its as props for children
1. Child Component accepts callback function as reference (memory address location 0000x10) then when user clicks on the button triger and invoke the callback function.
2. Parent Component create declaration and definition of callback function and all its arguments that needed then passing as reference to child.

```js
import React from "react"

export const CustomCard = ({children, handleClick, item, price, classes = ""}: 
    {children: React.ReactNode, handleClick: () => void, item: string, price: number, classes?: string}) => {
    const baseClass = `${classes} outline-none b-2 b-[#10b981] p-4 rounded-md text-base text-black font-bold`
    return <div className="container">
        <h2>Item Name: {item}</h2>
        <p>Price $ {price}</p>
        <button className={baseClass} onClick={handleClick}>
            {children}
        </button>
    </div>
}

import { CustomCard } from "@/pages/handling-events/CustomCard"

export const SubParentComponent = ({item, price, handleClick}: {item: string, price: number, handleClick: () => void}) => {
    return <CustomCard item={item} price={price} handleClick={handleClick}>
        <span>Order Now!</span>
    </CustomCard>
}

import { SubParentComponent } from "@/pages/handling-events/SubParentComponent"

export const ParentComponentOne = () => {
    const products = [
        {item: "Mac Book", price: 2000},
        {item: "Mac Book Pro+", price: 2500},
        {item: "Mac Book Pro+ Ultra", price: 3000},
        {item: "Mac Book Pro+ Ultimated", price: 5000},
    ]
    const handleClick = (item: string, price: number) => {
        const msg = `Item Name is ${item} and Total Price $${price}`;
        console.log(msg);
        alert(msg);
    }
    return (
        products.map((prod, idx) => 
            <SubParentComponent key={idx} item={prod.item} price={prod.price} handleClick={() => handleClick(prod.item, prod.price)}>
            </SubParentComponent>
        )
    )
}


import { SubParentComponent } from "@/pages/handling-events/SubParentComponent"

export const ParentComponentTwo = () => {
    const products = [
        {item: "Iphone 16 pro", price: 45000},
        {item: "Iphone 16 pro+", price: 7000},
        {item: "Iphone 16 pro+ Gold", price: 13000},
        {item: "Iphone 16 pro+ Gold & Accessories", price: 15000},
    ]
    const handleClick = (item: string, price: number) => {
        const msg = `Item Name is ${item} and Total Price $${price}`;
        console.log(msg);
        alert(msg);
    }
    return (
        products.map((prod, idx) => 
            <SubParentComponent key={idx} item={prod.item} price={prod.price} handleClick={() => handleClick(prod.item, prod.price)}>
            </SubParentComponent>
        )
    )
}


```
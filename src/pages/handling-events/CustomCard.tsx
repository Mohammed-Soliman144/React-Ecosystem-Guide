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
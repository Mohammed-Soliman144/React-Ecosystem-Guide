import {useState} from "react"



type itemsType = Array<{id: number, product: string, price: number, qty: number}>

export const ShoppingCart = () => {

    const [items, setItems] = useState<itemsType>([
        {id: 1, product: "React", price: 50, qty: 0},
        {id: 2, product: "Next.js", price: 100, qty: 0},
        {id: 3, product: "TypeScript", price: 150, qty: 0},
        {id: 4, product: "JavaScript", price: 20, qty: 0},
        {id: 5, product: "Tailwindcss", price: 60, qty: 0},
    ]);

    const handleClick = (id: number) => {
        setItems(prev => prev.map(item => {
            if(item.id === id && item.qty < 5)  
                return {
                    ...item,
                    qty: item.qty + 1
                }
            return item;
        }))
    }

    const handleClear = () => {
        setItems(prev => prev.map(item => {
            return {
                ...item,
                qty: 0,
            }
        }))
    }

    return (
        <>
            <ProductInfo items={items} handleClick={handleClick}/>
            <CardSummary items={items} />
            <button type="button" onClick={handleClear}>Clear All</button>
        </>
    )
}


const ProductInfo = ({items, handleClick}:{items: itemsType, handleClick: (id: number) => void}) => {
    return (
        <div className="container">
            <ul>
                { 
                items.map(item => {
                    return (
                        <li key={item.id}>
                            <h2>{item.product}</h2>
                            <p>Price: ${item.price}</p>
                            <p>Quantity: {item.qty} Items</p>
                            <button type="button" onClick={() => handleClick(item.id)}>Add To Card</button>
                        </li>
                    )
                })
            }
            </ul>
        </div>
    )
} 



const CardSummary = ({items}: {items: itemsType}) => { 
    const {totalQty, totalPrc} = items.reduce((acc, item) => ({
        totalQty: acc.totalQty + item.qty,
        totalPrc: acc.totalPrc + item.qty * item.price,
    }), {totalQty: 0, totalPrc: 0})
    return (
        <div>
            <h2>Total Quantity: {totalQty}</h2>
            <h2>Total Price: {totalPrc}</h2>
        </div>
    )
}
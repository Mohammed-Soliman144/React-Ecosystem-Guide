import React from "react"
import { type productType } from "./ProductsComponent"
export const Products = React.memo(({deferredFilterProducts, isTyping}: {deferredFilterProducts: Array<productType>, isTyping: boolean}) => {
    return <ul className="text-cyan-700" style={{
        opacity: isTyping ? 0.5 : 1,
        transition: 'opacity 0.4s ease',
    }}>
        {
            deferredFilterProducts.map(prod => {
                return (
                    <li key={prod.id}>
                        <h2>Product Name: {prod.name}</h2>
                        <p>Product Price: {prod.price}</p>
                        {prod.hasDiscount && 
                            <p>Discount: {prod.discount}</p>
                        }
                    </li>
                )
            })
        }
    </ul>
})
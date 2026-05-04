"use client"
import {use, Suspense} from "react"
import { type ProdutsRespone, REQUEST_OPTIONS, URL } from "./types"

const getProducts = async (): Promise<ProdutsRespone> => {
    try {
        const res = await fetch(URL, REQUEST_OPTIONS)
        if(!res.ok) console.error(`HTTP error with fetching data from API ${res.status}`)
        const data = await res.json() 
        return data 
    } catch(err) {
        if(err instanceof Error && err.name === "network-error")
            console.error(`Network Error ${err.message}`)
            // throw new Error(`Network Error ${err.message}`)
        const products: Products = {}
        return products
    } 
}

const productPromis = getProducts()
export const ProductsList = () => {
    const products = use(productPromis)
    return <div className="container">
        <Suspense fallback={<p className="text-3xl text-red-500">Waiting for respone...</p>}>
            {
                products.data.map(prod => {
                    return(
                        <article key={prod.product_title}>
                            <p>{prod.product_title}</p>
                            <p>{prod.product_description}</p>
                            <p>{prod.product_price}</p>
                            <p>{prod.product_photo}</p>
                        </article>
                    )
                })
            }
        </Suspense>
    </div>
}